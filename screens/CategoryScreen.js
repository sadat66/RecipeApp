import { useEffect, useState } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import recipesData from '../assets/data/recipes.json';

const CategoryScreen = ({ navigation, route, category }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Filter by category initially
        const categoryRecipes = recipesData.filter(item => item.category === category);
        setRecipes(categoryRecipes);
    }, [category]);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = recipesData.filter(item =>
            item.category === category &&
            (item.title.toLowerCase().includes(text.toLowerCase()) ||
                item.ingredients.some(ing => ing.toLowerCase().includes(text.toLowerCase())))
        );
        setRecipes(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            activeOpacity={0.8}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
                <View style={styles.tagContainer}>
                    <View style={styles.tag}>
                        <Text style={styles.tagText}>{item.ingredients.length} Ingredients</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FF8C00" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Zest & Zest 🍊</Text>
                <Text style={styles.headerSubtitle}>{category} Recipes</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Search ${category}...`}
                    placeholderTextColor="#FFCCBC"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                data={recipes}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 200 }]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF3E0', // Very light orange background
    },
    header: {
        padding: 20,
        backgroundColor: '#FF8C00', // Dark Orange
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 40,
        marginBottom: -20,
        zIndex: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#FFE0B2',
        marginTop: 5,
        fontWeight: '600',
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 2,
    },
    searchInput: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        color: '#E65100',
    },
    listContent: {
        padding: 20,
        paddingTop: 30,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#FF8C00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    cardImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E65100', // Darker orange for text
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 10,
    },
    tagContainer: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: '#FFE0B2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    tagText: {
        fontSize: 12,
        color: '#E65100',
        fontWeight: '600',
    },
});

export default CategoryScreen;
