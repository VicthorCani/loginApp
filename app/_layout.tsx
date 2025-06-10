import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { View, ActivityIndicator } from 'react-native';
 
export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();
 
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) setInitializing(false);
  };
 
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
 
  useEffect(() => {
    if (initializing) return;
 
    const inAuthGroup = segments[0] === '(login)';
 
    if (user && !inAuthGroup) {
      router.replace('/(login)/home');
    } else if (!user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, initializing]);
 
  if (initializing)
    return (
  <View
        style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
      >
        <ActivityIndicator size="large" />;
      </View>
      );
 
      return (
        <Stack>
          <Stack.Screen name="index" options={{ title: 'login' }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />
        </Stack>
      );
    
  // Exibir um indicador de carregamento enquanto inicializa
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
 
  return <Stack />;
}