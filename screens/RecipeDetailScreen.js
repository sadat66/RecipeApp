import { Ionicons } from '@expo/vector-icons'; // Assuming Expo includes vector icons
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';

const RecipeDetailScreen = ({ route, navigation }) => {
    const { recipe } = route.params;

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <StatusBar barStyle="light-content" />
            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: recipe.image }} style={styles.image} />
                    <TouchableOpacity
                        style={[styles.backButton, { top: insets.top + 20 }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <Text style={styles.description}>{recipe.description}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        {recipe.ingredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <View style={styles.bullet} />
                                <Text style={styles.ingredientText}>{ingredient}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        <Text style={styles.instructionsText}>{recipe.instructions}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 60,
    },
    imageContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#E65100',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#757575',
        lineHeight: 24,
        marginBottom: 25,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#FF8C00',
        paddingLeft: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF8C00',
        marginRight: 10,
    },
    ingredientText: {
        fontSize: 16,
        color: '#555',
    },
    instructionsText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 26,
    },
});

export default RecipeDetailScreen;
