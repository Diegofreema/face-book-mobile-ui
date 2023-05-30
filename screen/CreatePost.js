import {
  Button,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';

const user = {
  id: 'u1',
  image:
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg',
  name: 'Vadim Savin',
};
const CreatePost = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const submitPost = () => {
    console.warn('posting....', description);
    setDescription('');
    navigation.goBack();
  };
  useEffect(() => {
    if (description === '') {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [description]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <View style={styles.header}>
        <Image src={user.image} style={styles.img} />
        <Text>{user.name}</Text>
      </View>
      <Entypo
        onPress={pickImage}
        name="images"
        size={24}
        color="limegreen"
        style={styles.icon}
      />
      {image && <Image source={{ uri: image[0].uri }} style={styles.image} />}

      <TextInput
        placeholder="What's on your mind?"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <Button title="Post" onPress={submitPost} disabled={disabled} />
    </KeyboardAvoidingView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
});
