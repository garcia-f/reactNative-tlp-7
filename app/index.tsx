import { View, Button, Text } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >   
      <Text style={{ marginBottom: 20 }}>Bienvenidos a la pagina principal</Text>
       <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '10%' }}>
        <Button
          title="LOGIN"
          onPress={() => router.replace('/login')}
        />
        <Button
          title="REGISTER"
          onPress={() => router.replace('/register')}
        />
      </View>
      
    </View>
  );
}
