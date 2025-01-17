// Categories.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { useFetch } from '../../Utils/useFetch';
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const {data,loading,error} = useFetch("/categories");
  useEffect(()=>{
    console.log(data,"categories");
    data && setCategories(data.categories)
  },[data])

if(loading){
  return <Text>loading</Text>
}
if(error){
  console.log(error);
  return <Text>something went wrong</Text>
} 
  // useEffect(() => {
  //   getCategories();
  // }, []);

  const getCategories = () => {
    GlobalApi.getCategories().then(resp => {
      setCategories(resp?.categories);
    });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={'Categories'} isViewAll={true} />
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.push('business-list', {
              category: item.name
            })}
          >
            <View style={styles.iconContainer}>
              <Image source={{ uri: item?.icon }} style={{ width: 30, height: 30 }} />
            </View>
            <Text style={{ fontFamily: 'outfit-medium', marginTop: 5 }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom:10
  },
  iconContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
});
