import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '../../common';
import { useAuth } from '../../providers/AuthProvider';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();
  return (
    <View>
      <Text>Log in</Text>
      <Input placeholder='email' value={email} updateValue={setEmail} variant='third' />
      <Input
        placeholder='password'
        value={password}
        updateValue={setPassword}
        secureTextEntry
        variant='third'
      />
      <Button title='Log in' onPress={() => logIn({ email, password })} />
    </View>
  );
};

export default LoginScreen;
