import { StyleSheet, Text, View, TextInput, Image } from 'react-native'

import EditScreenInfo from '@/components/EditScreenInfo'
// import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/v-logo.png')}
              style={styles.logo}
              />
      <Text style={styles.title}>Hello new member</Text>
      <View style={styles.separator} />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <Text style={styles.placeholder}>Enter your email</Text>
      <TextInput style={styles.nameInput} />
      <Text style={styles.placeholder}>Tell us about yourself 😊</Text>
      <TextInput style={styles.bioInput} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC769A'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4F4DD',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  placeholder: {
    color: '#F4F4DD',
    fontSize: 20
  },
  nameInput: {
    margin: 15,
    marginBottom: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: '70%',
    height: '6%',
    borderRadius: 10,
    backgroundColor: '#F4F4DD',
  },
  bioInput: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    width: '70%',
    height: '20%',
    borderRadius: 10,
    backgroundColor: '#F4F4DD'
  },
  logo:{
    width: 180, 
    height: 70, 
    resizeMode: 'contain', 
    position: 'absolute',
    top: 10,
    left: 10,
  }
})
