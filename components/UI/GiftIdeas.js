import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BuddyColors } from "../../constants/colors";
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import { addNewWishlistItem, deleteWishlistItem, getWishlist, updateWishlistItem } from "../../util/SQLlite";


const Idea = ({ text }) => {
  return (
    <View style={styles.ideaHolder}>
      <View style={styles.line}></View>
      <Text style={styles.ideaText}>{text}</Text>
    </View>
  )
}



const GiftIdeas = ({ BuddyId }) => {
  const [ideas, setIdeas] = useState([])
  const [addNewIdea, setAddNewIdea] = useState(false)
  const [newIdeaText, setNewIdeaText] = useState("")

  const [editIdea, setEditIdea] = useState(false)
  const [ideaToEdit, setIdeaToEdit] = useState("")
  const [editIdeaValue, setEditIdeaValue] = useState("")

  const getWish = async () => {
    const wishlist = await getWishlist(BuddyId)
    setIdeas(() => [...wishlist])
  }

  useEffect(() => {

    getWish()
  }, [])

  const submit = async () => {
    setAddNewIdea(false)
    if (!newIdeaText) return

    await addNewWishlistItem(BuddyId, newIdeaText)
    await getWish()

    setAddNewIdea(false)
    setNewIdeaText("")
  }

  const editIdeaSubmit = (idea) => {
    setEditIdeaValue(idea.wish)
    setIdeaToEdit(idea.id)
    setEditIdea(!editIdea)
  }

  const submitEditedIdea = async (id) => {
    setEditIdea(false)
    setIdeaToEdit(null)
    if (editIdeaValue == "") {
      await deleteWishlistItem(id)
    } else {
      await updateWishlistItem(id, editIdeaValue)
    }
    await getWish()
  }

  return (
    <View>
      <View style={styles.mainTextHolder}>
        <Text style={styles.mainText} >Gift ideas</Text>
        <Ionicons name="add" color={BuddyColors.accent} size={30} onPress={() => setAddNewIdea(!addNewIdea)} />
      </View>

      <View>

        {ideas.map(idea => {
          return (
            <View key={idea.id}>
              {editIdea && ideaToEdit == idea.id ? (
                <View style={styles.addIdeaHolder}>
                  <TextInput
                    style={styles.addIdeaInput}
                    placeholderTextColor={BuddyColors.gray}
                    onSubmitEditing={() => submitEditedIdea(idea.id)}
                    defaultValue={editIdeaValue}
                    onChangeText={(e) => setEditIdeaValue(e)}
                    autoFocus
                    onBlur={() => submitEditedIdea(idea.id)} />
                </View>
              ) : (
                <Pressable onPress={() => editIdeaSubmit(idea)}>
                  <Idea text={idea.wish} />
                </Pressable>
              )}
            </View>
          )
        })}

        {addNewIdea && (
          <View style={styles.addIdeaHolder}>
            <TextInput
              style={styles.addIdeaInput}
              placeholder={"Add new idea"}
              placeholderTextColor={BuddyColors.gray}
              onSubmitEditing={submit}
              value={newIdeaText}
              onChangeText={(e) => setNewIdeaText(e)}
              autoFocus
              onBlur={submit} />
          </View>
        )}

      </View>
    </View>
  )
}

export default GiftIdeas


const styles = StyleSheet.create({
  container: {

  },
  mainText: {
    color: BuddyColors.textColor,
    fontSize: 20,
  },
  ideaHolder: {
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 10,
  },
  line: {
    backgroundColor: BuddyColors.accent,
    height: "100%",
    width: 1
  },
  ideaText: {
    color: BuddyColors.textColor,
    fontSize: 17,
    marginLeft: 5,
  },
  mainTextHolder: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  addIdeaHolder: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 15,
    backgroundColor: BuddyColors.lightDark,
  },
  addIdeaInput: {
    color: BuddyColors.textColor
  }
})