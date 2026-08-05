
import {  StyleSheet, Text, TextInput, TouchableOpacity, View,FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css"
const users = [
  { id: "1", name: "Ravi", age: 25 },
  { id: "2", name: "Kumar", age: 26 },
  { id: "3", name: "Rahul", age: 24 },
  { id: "4", name: "Priya", age: 23 },
  { id: "5", name: "Anjali", age: 22 },
];

export default function RootLayout() {
  return (
    <SafeAreaView>
      <View
        className="p-6"
        
      >
        <Text>safe are view</Text>
        <TextInput placeholder="serchcity..."
          placeholderTextColor="#999"
          style={{
            borderRadius: 8,
            borderWidth: 2,
            borderColor: "#ddd",
            padding: 10,
            marginTop:12
            
          }}
        />
        <TouchableOpacity
          onPress={()=>alert("search...")}
          style={{
          backgroundColor: '#2563eb',
          padding: 10,
          borderRadius: 8,
          marginTop:12
        }}>
          <Text
            style={{
            textAlign: "center",
            color: "white",
            fontWeight: 300,
            fontSize:17
          }}>search</Text>
        </TouchableOpacity>
         
        <FlatList
          style={{
            marginTop:20
          }}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Age: {item.age}</Text>
          </View>
        )}
      />
    </View>
       
      
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});