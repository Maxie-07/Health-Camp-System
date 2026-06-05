import React from 'react';
import { Text, View } from 'react-native';
import { QRScanner } from '../components/QRScanner';
import { VisitForm } from '../components/VisitForm';
import { queueSyncItem } from '../database/migrations';

export const VisitScreen = () => {
  const [beneficiaryId, setBeneficiaryId] = React.useState<number | null>(null);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Record Visit</Text>
      <QRScanner onScan={() => setBeneficiaryId(1)} />
      {beneficiaryId && (
        <VisitForm
          beneficiaryId={beneficiaryId}
          onSubmit={async visit => {
            await queueSyncItem('visit', visit);
          }}
        />
      )}
    </View>
  );
};
