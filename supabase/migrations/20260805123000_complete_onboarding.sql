create or replace function complete_onboarding(
  p_currency text,
  p_starting_balance numeric
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id text;
  v_current_currency text;
  v_account_id uuid;
begin
  -- Get user ID from auth context
  v_user_id := auth.jwt()->>'sub';
  
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  -- Lock user row for idempotency check
  select currency into v_current_currency
  from users
  where clerk_id = v_user_id
  for update;

  if v_current_currency is not null then
    -- Onboarding already completed
    return;
  end if;

  -- Update user currency
  update users
  set currency = p_currency
  where clerk_id = v_user_id;

  -- Get default account and lock
  select id into v_account_id
  from accounts
  where user_id = v_user_id and is_default = true
  for update;

  if v_account_id is null then
    raise exception 'Default account not found';
  end if;

  -- Insert starting balance transaction
  insert into transactions (
    user_id, account_id, type, amount, category, description, date, input_method
  ) values (
    v_user_id, v_account_id, 'INCOME', p_starting_balance, 'other_income', 'Starting balance', now(), 'MANUAL'
  );

  -- Update account balance
  update accounts
  set balance = balance + p_starting_balance
  where id = v_account_id;
end;
$$;
