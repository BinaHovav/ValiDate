import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import httpService from '../../services/httpService';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function WelcomePage() {
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idealPartnerResponse, setIdealPartnerResponse] = useState<
    string[] | string
  >('');

  const addUser = async () => {
    try {
      // Check if the bio meets the minimum length requirement
      // if (bio.length < 40) {
      //   setErrorMessage('Bio must be at least 40 characters long');
      //   return; // Stop execution if the bio is too short
      // }

      setIsLoading(true);

      const userData = {
        email: email,
        bio: bio,
      };

      const response: any = await httpService.post(
        '/users/add-user',
        userData
      );

      const idealProfile: string = response.idealProfile;
      const matchedPartners: string[] = response.matchedPartners;

      setIdealPartnerResponse(
        matchedPartners.length > 0
          ? 'Yay! We found a match that suits your description\n' +
              'You may contact him through his email: \n' +
              matchedPartners
          : "Unfortunately we couldn't find a match for you on our app, but here is an idea for you: " +
              idealProfile
      );
      setIsModalVisible(true);

      setEmail('');
      setBio('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  const closeModal = () => {
    setIsLoading(false);
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.container}
      >
        <View style={styles.form}>
          <Image
            source={require('../../assets/images/v-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* <View> */}
          <Text style={styles.title}>Hello new member</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.nameInput}
            value={email}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.label}>Tell us about yourself 😊</Text>
          <TextInput
            style={styles.bioInput}
            value={bio}
            placeholder="Minimum 40 characters"
            onChangeText={(text) => setBio(text)}
          />
          <Button
            title="Find me a match!"
            color="#F8C5C8"
            onPress={() => {
              addUser();
            }}
          />
          <Spinner
            visible={isLoading}
            textContent={'Finding you a match...'}
            textStyle={styles.spinnerTextStyle}
            overlayColor="rgba(0, 0, 0, 0.45)"
          />
        </View>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.scrollView}>
            <Modal
              visible={isModalVisible}
              animationType="fade"
              // transparent={true}
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.modalContent}>
                  {idealPartnerResponse}
                </Text>
                <Button title="Close" onPress={closeModal} />
                {/* </View> */}
              </View>
            </Modal>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
