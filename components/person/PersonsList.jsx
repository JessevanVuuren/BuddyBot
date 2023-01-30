import { useIsFocused, useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useLayoutEffect, useState } from "react";
import { daysUntilNext } from "../../util/utils";
import SearchBar from "../UI/FILTER/SearchBar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SinglePerson from "./SinglePerson";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const PersonsList = ({ persons }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [sortedList, setSortedList] = useState();
  const isFocused = useIsFocused();

  const [isBDay, setIsBDay] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const navigation = useNavigation();

  const selectedBuddy = (id) => {
    navigation.navigate("PersonDetails", {
      buddyID: id,
    });
  };

  const notificationScreen = () => {
    navigation.navigate("Notifications");
  }

  const toggleSearch = () => {
    setSearchText("");
    setSearchBar(!searchBar);
  };

  useLayoutEffect(() => {
    (async () => {
      navigation.setOptions({
        headerRight: ({ tintColor }) => (
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons name="bell" style={{marginRight:10}} size={24} color={tintColor} onPress={notificationScreen}/>
            <Ionicons name="md-search" size={25} color={tintColor} onPress={toggleSearch} />
          </View>
        ),
      });

      persons = persons.filter((person) => {
        if (searchText === "") return person;
        return person.name.includes(searchText);
      });

      persons.sort((a, b) => {
        const date1 = new Date(a.DOB);
        const date2 = new Date(b.DOB);

        const time1 = daysUntilNext(date1.getMonth() + 1, date1.getDate());
        const time2 = daysUntilNext(date2.getMonth() + 1, date2.getDate());

        if (time1 === 0) setIsBDay(true);
        if (time2 === 0) setIsBDay(true);

        if (time1 > time2) {
          return 1;
        }
        return -1;
      });

      setSortedList(persons);
    })();
  }, [persons, isFocused, setSearchBar, searchBar, searchText]);

  if (!sortedList) {
    return (
      <View>
        <Text>sorting</Text>
      </View>
    );
  }

  return (
    <>
      {searchBar && <SearchBar searchTerm={(text) => setSearchText(text)} />}

      {isBDay && isAnimating && (
        <ConfettiCannon count={100} origin={{ x: width / 2, y: height }} autoStart={true} fadeOut onAnimationEnd={() => setIsAnimating(false)} />
      )}

      <FlatList
        style={styles.container}
        data={sortedList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SinglePerson person={item} selectedBuddy={selectedBuddy} dirtyUpdate={Math.random()} />}
      />
    </>
  );
};

export default PersonsList;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    zIndex: -1,
  },
});
