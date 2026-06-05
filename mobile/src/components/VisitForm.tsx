import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { Visit } from '../models/Visit';

export const VisitForm = ({
  beneficiaryId,
  onSubmit,
}: {
  beneficiaryId: number;
  onSubmit: (value: Visit) => void;
}) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');

  return (
    <View>
      <TextInput placeholder="Diagnosis" value={diagnosis} onChangeText={setDiagnosis} />
      <TextInput placeholder="Treatment" value={treatment} onChangeText={setTreatment} />
      <Button
        title="Save visit"
        onPress={() => onSubmit({ beneficiaryId, diagnosis, treatment })}
      />
    </View>
  );
};
