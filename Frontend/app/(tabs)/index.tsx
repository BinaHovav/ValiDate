import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import httpService from '../../services/httpService';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import AppModal from './modal';

export default function WelcomePage() {
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idealPartnerResponse, setIdealPartnerResponse] = useState<string[] | string>('');

  const MIN_NUM_OF_CHARACTERS = 40;

  const addUserAndGenerateMatch = async () => {
    try {
      if (bio.length < MIN_NUM_OF_CHARACTERS) {
        setErrorMessage('Bio must be at least ' + MIN_NUM_OF_CHARACTERS + ' characters long');
        return;
      }

      setIsLoading(true);

      const userData = {
        email: email,
        bio: bio,
      };

      const response: any = await httpService.post('/users/add-user', userData);

      const idealProfile: string = response.idealProfile;
      const matchedPartners: string[] = response.matchedPartners;
      setIdealPartnerResponse(
        matchedPartners.length > 0
          ? `Yay! We found a match that suits your description\nYou may contact them through their email:\n${matchedPartners.join(
              '\n'
            )}\n\n\n We also suggest for you the kind of partner you're looking for:\n${idealProfile}`
          : `Unfortunately, we couldn't find a match for you on our app, but here is an idea for an ideal match for you: ${idealProfile}`
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
    <ScrollView>
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
            color="blue"
            onPress={() => {
              addUserAndGenerateMatch();
            }}
          />
          <Text style={styles.error}>{errorMessage} </Text>
          <Spinner
            visible={isLoading}
            textContent={'Finding you a match...'}
            textStyle={styles.spinnerTextStyle}
            overlayColor="rgba(0, 0, 0, 0.45)"
          />
        </View>
        <View style={styles.modalContainer}>
          <ScrollView>
            <AppModal
              closeModal={closeModal}
              isModalVisible={isModalVisible}
              idealPartnerResponse={idealPartnerResponse}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
