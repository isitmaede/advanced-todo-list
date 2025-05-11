// App.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, StatusBar, ActivityIndicator } from "react-native";
import { COLORS, FONTS } from "./theme";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";

// تحميل الخطوط
async function loadFonts() {
  await Font.loadAsync({
    "Cairo-Regular": require("./assets/fonts/Cairo-Regular.ttf"),
    "Cairo-Bold": require("./assets/fonts/Cairo-Bold.ttf"),
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const startApp = () => setShowWelcome(false);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask("");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {showWelcome ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>🌟 تطبيق قائمة المهام</Text>
          <Text style={styles.quote}>"النجاح يبدأ بالتخطيط والتنظيم"</Text>
          <Text style={styles.credits}>© 2025 maede</Text>
          <TouchableOpacity style={styles.startButton} onPress={startApp}>
            <Text style={styles.startText}>ابدأ الآن</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>📋 قائمة مهامي</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="أدخل مهمة جديدة..."
              placeholderTextColor="#aaa"
              value={task}
              onChangeText={setTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Feather name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.text}</Text>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Feather name="trash-2" size={20} color={COLORS.danger} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>لا توجد مهام بعد</Text>}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },
  quote: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginBottom: 20,
    textAlign: "center",
  },
  credits: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: "#aaa",
    marginBottom: 20,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  startText: {
    color: "#fff",
    fontFamily: FONTS.bold,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 8,
    color: COLORS.text,
    fontFamily: FONTS.regular,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: COLORS.card,
    marginVertical: 5,
    borderRadius: 8,
  },
  taskText: {
    fontFamily: FONTS.regular,
    color: COLORS.text,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    fontFamily: FONTS.regular,
    marginTop: 20,
  },
});
