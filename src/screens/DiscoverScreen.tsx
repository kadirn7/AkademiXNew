import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import DataManager, { Academic, AcademicPost } from '../utils/DataManager';

const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [filteredAcademics, setFilteredAcademics] = useState<Academic[]>([]);
  const [selectedAcademic, setSelectedAcademic] = useState<Academic | null>(null);
  const [showPublications, setShowPublications] = useState(false);
  const [publications, setPublications] = useState<AcademicPost[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterAcademics();
  }, [searchQuery, academics]);

  const loadData = () => {
    const dataManager = DataManager.getInstance();
    setAcademics(dataManager.getAcademics());
  };

  const filterAcademics = () => {
    if (!searchQuery.trim()) {
      setFilteredAcademics(academics);
    } else {
      const filtered = academics.filter(academic =>
        academic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        academic.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        academic.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAcademics(filtered);
    }
  };

  const handleFollow = (academicId: string) => {
    const dataManager = DataManager.getInstance();
    dataManager.toggleFollow(academicId);
    setAcademics([...dataManager.getAcademics()]);
  };

  const handleViewPublications = (academic: Academic) => {
    setSelectedAcademic(academic);
    // Mock yayınlar - gerçek uygulamada API'den gelecek
    const mockPublications: AcademicPost[] = [
      {
        id: 'pub1',
        authorId: academic.id,
        author: academic.name,
        university: academic.university,
        title: 'Akademik Araştırma ve Gelişmeler',
        abstract: 'Bu çalışmada, akademik araştırma süreçleri ve son gelişmeler ele alınmıştır.',
        type: 'Makale',
        journal: 'Academic Research Journal',
        date: '1 ay önce',
        likes: 25,
        comments: 8,
        pdfUrl: '#',
        image: '📚',
        isLiked: false,
        isShared: false,
      },
      {
        id: 'pub2',
        authorId: academic.id,
        author: academic.name,
        university: academic.university,
        title: 'Bilimsel Yöntemler ve Uygulamalar',
        abstract: 'Bilimsel araştırma yöntemlerinin modern uygulamalardaki rolü incelenmiştir.',
        type: 'Makale',
        journal: 'Scientific Methods Review',
        date: '2 ay önce',
        likes: 18,
        comments: 5,
        pdfUrl: '#',
        image: '🔬',
        isLiked: false,
        isShared: false,
      },
    ];
    setPublications(mockPublications);
    setShowPublications(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Keşfet</Text>
        <Text style={styles.headerSubtitle}>Akademisyenleri keşfedin ve takip edin</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Akademisyen, üniversite veya bölüm ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{academics.length}</Text>
            <Text style={styles.statLabel}>Toplam Akademisyen</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {academics.filter(a => a.isFollowing).length}
            </Text>
            <Text style={styles.statLabel}>Takip Edilen</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {academics.reduce((total, a) => total + a.publications, 0)}
            </Text>
            <Text style={styles.statLabel}>Toplam Yayın</Text>
          </View>
        </View>

        <View style={styles.academicsSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? 'Arama Sonuçları' : 'Tüm Akademisyenler'}
          </Text>
          
          {filteredAcademics.map((academic) => (
            <View key={academic.id} style={styles.academicCard}>
              <View style={styles.academicHeader}>
                <View style={styles.academicInfo}>
                  <Text style={styles.academicAvatar}>{academic.avatar}</Text>
                  <View style={styles.academicDetails}>
                    <Text style={styles.academicName}>{academic.name}</Text>
                    <Text style={styles.academicTitle}>{academic.title}</Text>
                    <Text style={styles.academicUniversity}>{academic.university}</Text>
                    <Text style={styles.academicDepartment}>{academic.department}</Text>
                  </View>
                </View>
                <View style={styles.academicStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{academic.publications}</Text>
                    <Text style={styles.statLabel}>Yayın</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{academic.citations}</Text>
                    <Text style={styles.statLabel}>Atıf</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{academic.hIndex}</Text>
                    <Text style={styles.statLabel}>h-index</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.academicActions}>
                <TouchableOpacity 
                  style={[
                    styles.followButton,
                    academic.isFollowing && styles.followingButton
                  ]}
                  onPress={() => handleFollow(academic.id)}
                >
                  <Text style={[
                    styles.followButtonText,
                    academic.isFollowing && styles.followingButtonText
                  ]}>
                    {academic.isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.publicationsButton}
                  onPress={() => handleViewPublications(academic)}
                >
                  <Text style={styles.publicationsButtonText}>Yayınları Gör</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Yayınlar Modal */}
      <Modal
        visible={showPublications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPublications(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedAcademic?.name} - Yayınlar
              </Text>
              <TouchableOpacity onPress={() => setShowPublications(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={publications}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.publicationItem}>
                  <View style={styles.publicationHeader}>
                    <Text style={styles.publicationTitle}>{item.title}</Text>
                    <Text style={styles.publicationType}>{item.type}</Text>
                  </View>
                  <Text style={styles.publicationAbstract} numberOfLines={3}>
                    {item.abstract}
                  </Text>
                  <Text style={styles.publicationJournal}>{item.journal}</Text>
                  <Text style={styles.publicationDate}>{item.date}</Text>
                </View>
              )}
              style={styles.publicationsList}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  academicsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  academicCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  academicHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  academicInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  academicAvatar: {
    fontSize: 50,
    marginRight: 15,
  },
  academicDetails: {
    flex: 1,
  },
  academicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  academicTitle: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 2,
  },
  academicUniversity: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  academicDepartment: {
    fontSize: 12,
    color: '#999',
  },
  academicStats: {
    alignItems: 'flex-end',
  },
  statItem: {
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 2,
  },
  academicActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  followButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: '#e3f2fd',
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: '#2196F3',
  },
  publicationsButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  publicationsButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  publicationsList: {
    maxHeight: 400,
  },
  publicationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  publicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  publicationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  publicationType: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  publicationAbstract: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  publicationJournal: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  publicationDate: {
    fontSize: 11,
    color: '#999',
  },
});

export default DiscoverScreen; 