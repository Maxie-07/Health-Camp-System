import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { Beneficiary } from '../models/Beneficiary';

export const BeneficiaryForm = ({
  onSubmit,
}: {
  onSubmit: (value: Beneficiary) => void;
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View>
      <TextInput placeholder="Full name" value={fullName} onChangeText={setFullName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <Button title="Save beneficiary" onPress={() => onSubmit({ fullName, phone })} />
    </View>
  );
};
