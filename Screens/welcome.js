import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

const colors = {
  primary: '#fff',
  secondary: '#adadad',
  tertiary: '#057afd',
  alternative: '#666',
  fb: '#39559f',
  disabled: 'rgba(5, 122, 253, 0.5)',
};

const basic = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
});

const form = StyleSheet.create({
  field: {
    padding: 15,
    paddingVertical: 14,
    position: 'relative',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 0,
  },
  text: {
    color: colors.secondary,
    fontSize: 15,
  },
  button: {
    borderRadius: 5,
    alignContent: 'center',
    backgroundColor: colors.tertiary,
    padding: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 15,
  },
});

const Home = ({navigation}) => {
  return (
    <>
      <Image source={require('../assets/logo.png')} style={basic.image} />
      <View style={basic.container}>
        <View>
          <View style={form.field}>
            <Text style={form.heading}>Welcome to Community Konnect!</Text>
            <Text style={[form.text, {paddingVertical: 10, lineHeight: 25}]}>
              Empowering Community Service students.
            </Text>
          </View>
          <View style={form.field}>
            <TouchableOpacity
              style={form.button}
              onPress={() => navigation.navigate('dash')}>
              <Text style={form.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;



