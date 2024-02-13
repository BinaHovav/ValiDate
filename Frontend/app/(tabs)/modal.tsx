import React from 'react';

import { View, Text, Button, Modal, ScrollView, Image } from 'react-native';
import styles from './styles';

const AppModal = ({
  isModalVisible,
  closeModal,
  idealPartnerResponse,
}: {
  isModalVisible: boolean;
  closeModal: () => void;
  idealPartnerResponse: any;
}) => {
  return (
    <Modal visible={isModalVisible} animationType="fade" onRequestClose={closeModal}>
      <ScrollView>
        <View style={styles.modalContainer}>
          <Text style={styles.modalContent}>{idealPartnerResponse}</Text>
          <Button title="Close" color="#F8C5C8" onPress={closeModal} />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default AppModal;
