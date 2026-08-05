import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useClerk, useUser } from '@clerk/expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function ProfileScreen() {
     const { user } = useUser();
    const { signOut } = useClerk();
    
    const handleSignOut = () => {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/sign-in");
        },
      },
    ]);
  };
  return (
    <SafeAreaView>
          <View>
              <Text>Hello, {user?.firstName ?? 'friend'}</Text>
              <TouchableOpacity
                  onPress={handleSignOut }
              >
                  <Text >SignOut</Text>
              </TouchableOpacity>
              
          </View>
          
    </SafeAreaView>
  )
}