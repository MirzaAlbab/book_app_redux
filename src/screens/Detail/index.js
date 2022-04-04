import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {v, vs, m, ms} from 'react-native-size-matters';
import NavButton from '../../components/NavButton';
import Loader from '../../components/Loading';
import {Rupiah} from '../../helpers/Rupiah';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from '../../components/Loading';

export default function Detail({navigation, route}) {
  const {detailBook} = useSelector(state => state.home);
  const {loading} = useSelector(state => state.global);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: 60,
          position: 'absolute',
          backgroundColor: 'rgba(00, 0, 0, 0.1)',
        }}
      />

      <NavButton
        navigation={navigation}
        judul={{judul: `${detailBook.title}`}}
      />

      <ImageBackground
        style={styles.image}
        source={{uri: `${detailBook.cover_image}`}}
        blurRadius={100}>
        <View style={{height: '100%'}}>
          <View style={styles.detailContainer}>
            <Image
              style={{
                height: '50%',
                width: '35%',
                backgroundColor: '#462B78',
                marginTop: -20,
              }}
              source={{uri: `${detailBook.cover_image}`}}
            />

            <View style={{marginTop: 15, marginBottom: 0}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {detailBook.title}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {detailBook.author}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                {detailBook.publisher}
              </Text>
            </View>
            <View style={styles.detailBox}>
              <View style={styles.detailBoxBackground}>
                <View
                  style={[
                    styles.boxSection,
                    {borderTopLeftRadius: 15, borderBottomLeftRadius: 15},
                  ]}>
                  <Text style={styles.topText}>
                    <FontAwesome name="star" color="yellow" size={15} />{' '}
                    {detailBook.average_rating}
                  </Text>
                  <Text style={styles.bottomText}>Rating</Text>
                </View>
                <View
                  style={{
                    height: '40%',
                    backgroundColor: 'white',
                    opacity: 0.15,
                    width: 1,
                  }}
                />
                <View style={styles.boxSection}>
                  <Text style={styles.topText}>{Rupiah(detailBook.price)}</Text>
                  <Text style={styles.bottomText}>Price</Text>
                </View>
                <View
                  style={{
                    height: '40%',
                    backgroundColor: 'white',
                    opacity: 0.15,
                    width: 1,
                  }}
                />
                <View
                  style={[
                    styles.boxSection,
                    {borderTopRightRadius: 15, borderBottomRightRadius: 15},
                  ]}>
                  <Text style={styles.topText}>{detailBook.total_sale}</Text>
                  <Text style={styles.bottomText}>Total Sale</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.description}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          Description
        </Text>
        <ScrollView>
          <Text
            style={{
              color: 'white',
              opacity: 0.5,
              fontSize: 18,
              letterSpacing: 0.3,
            }}>
            {detailBook.synopsis}
          </Text>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            width: '10%',
            marginRight: '5%',
            borderRadius: 10,
            backgroundColor: 'white',
            opacity: 0.12,
            padding: 8,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              borderWidth: 2,
              borderColor: 'white',
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '85%',
            borderRadius: 10,
            backgroundColor: '#f9784b',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => alert('Book is not available')}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#1C222B',
  },
  image: {
    flex: 1,
    width: '100%',
    minHeight: '65%',
    maxHeight: '65%',
    zIndex: -1,
  },
  detailContainer: {
    marginTop: '25%',
    height: '80%',
    alignItems: 'center',
  },
  detailBox: {
    flex: 1,
    width: '100%',
    padding: 25,
    marginBottom: 10,
  },
  detailBoxBackground: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    borderRadius: 15,
  },
  boxSection: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  topText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  bottomText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    opacity: 0.5,
    padding: 5,
    textAlign: 'center',
  },
  description: {
    flex: 1,
    padding: 25,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
    maxHeight: 60,
    backgroundColor: 'transparent',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
  },
});
