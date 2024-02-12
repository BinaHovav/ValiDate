import React, { useState } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import httpService from '../../services/httpService'

export default function WelcomePage() {
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [idealPartnerResponse, setIdealPartnerResponse] = useState<string[] | string>('')

  const addUser = async () => {
    try {
      const userData = {
        email: email,
        bio: bio,
      }
      const response: any = await httpService.post('/users/add-user', userData)

      const idealProfile: string = response.idealProfile
      const matchedPartners: string[] = response.matchedPartners

      setIdealPartnerResponse(matchedPartners.length > 0 ? matchedPartners : idealProfile)

      setEmail('')
      setBio('')
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/v-logo.png')} style={styles.logo} resizeMode="contain" />
      <View>
        <Text style={styles.title}>Hello new member</Text>
        <Text style={styles.placeholder}>Enter your email</Text>
        <TextInput style={styles.nameInput} value={email} onChangeText={(text) => setEmail(text)} />
        <Text style={styles.placeholder}>Tell us about yourself 😊</Text>
        <Text style={styles.smallPlaceholder}>Minimum 40 characters</Text>
        <TextInput style={styles.bioInput} value={bio} onChangeText={(text) => setBio(text)} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addUser()
          }}
        >
          <Text>Enter</Text>
        </TouchableOpacity>
        <View>
          <Text>Ideal Partner Profile:</Text>
          <Text style={styles.smallPlaceholder}>{idealPartnerResponse}</Text>
        </View>
      </View>
    </View>
  )
}
