import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useState, useLayoutEffect } from 'react';
const { width } = Dimensions.get('window');
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const FeedPost = ({ post }) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const likeHandler = () => {
    setIsLiked((prevState) => !prevState);
  };
  return (
    <View style={styles.post}>
      <Pressable
        style={styles.header}
        onPress={() => navigation.navigate('Profile', { id: post.User.id })}
      >
        <View style={styles.headerLeft}>
          <View style={styles.imgCon}>
            <Image src={post.User.image} style={styles.img} />
          </View>
          <View>
            <Text style={styles.name}>{post.User.name}</Text>
            <Text style={styles.subtitle}>{post.createdAt}</Text>
          </View>
        </View>
        <Entypo name="dots-three-horizontal" size={18} color={'gray'} />
      </Pressable>
      {post.description && (
        <Text style={styles.description}>{post.description}</Text>
      )}

      <View>
        {post.image && (
          <Image src={post.image} style={styles.mainImg} resizeMode="cover" />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.footer}>
          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.row}>
              <View style={styles.icon}>
                <AntDesign name="like1" size={14} color="white" />
              </View>

              <Text style={styles.likedBy}>
                Elon Musk and {post.numberOfLikes} others
              </Text>
            </View>
            <Text style={styles.shares}>{post.numberOfShares} shares</Text>
          </View>
        </View>
        <View style={styles.buttonsRow}>
          {/* Like button */}
          <Pressable style={styles.iconButton} onPress={likeHandler}>
            {isLiked ? (
              <AntDesign name="like2" size={18} color="blue" />
            ) : (
              <AntDesign name="like2" size={18} color="gray" />
            )}

            <Text style={styles.iconButtonText}>Like</Text>
          </Pressable>

          {/* Comment button */}
          <View style={styles.iconButton}>
            <FontAwesome5 name="comment-alt" size={16} color="gray" />
            <Text style={styles.iconButtonText}>Comment</Text>
          </View>

          {/* Share button */}
          <View style={styles.iconButton}>
            <MaterialCommunityIcons
              name="share-outline"
              size={18}
              color="gray"
            />
            <Text style={styles.iconButtonText}>Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedPost;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgCon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainImg: {
    width: '100%',
    aspectRatio: 1,
  },
  description: {
    lineHeight: 20,
    padding: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingVertical: 10,
    borderBottomColor: 'lightGray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
    backgroundColor: 'blue',
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  iconButton: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconButtonText: {
    marginLeft: 5,
  },
  post: {
    marginBottom: 10,
  },
});
