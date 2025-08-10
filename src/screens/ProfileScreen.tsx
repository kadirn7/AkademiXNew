import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Modal,
  TextInput,
  FlatList
} from 'react-native';
import DataManager, { User, AcademicPost } from '../utils/DataManager';

interface ProfileScreenProps {
  onLogout?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<AcademicPost[]>([]);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    abstract: '',
    type: 'Makale' as 'Makale' | 'Tez' | 'Kitap',
    journal: '',
    image: '📚',
  });
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const dataManager = DataManager.getInstance();
    setUser(dataManager.getCurrentUser());
    setUserPosts(dataManager.getUserPosts());
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Çıkış Yap', 
          style: 'destructive',
          onPress: () => {
            const dataManager = DataManager.getInstance();
            dataManager.logout();
            if (onLogout) {
              onLogout();
            }
            Alert.alert('Başarılı', 'Başarıyla çıkış yapıldı.');
          }
        }
      ]
    );
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.abstract || !newPost.journal) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const dataManager = DataManager.getInstance();
    dataManager.addUserPost({
      author: user?.name || '',
      university: user?.university || '',
      title: newPost.title,
      abstract: newPost.abstract,
      type: newPost.type,
      journal: newPost.journal,
      date: 'Şimdi',
      likes: 0,
      comments: 0,
      pdfUrl: '#',
      image: newPost.image,
    });

    setUserPosts([...dataManager.getUserPosts()]);
    setNewPost({
      title: '',
      abstract: '',
      type: 'Makale',
      journal: '',
      image: '📚',
    });
    setShowAddPost(false);
    Alert.alert('Başarılı', 'Paylaşımınız eklendi!');
  };

  const handleAddNote = () => {
    if (!newNote.trim()) {
      Alert.alert('Hata', 'Lütfen not içeriği yazın.');
      return;
    }

    setNotes([...notes, newNote.trim()]);
    setNewNote('');
  };

  const handleDeleteNote = (index: number) => {
    Alert.alert(
      'Notu Sil',
      'Bu notu silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: () => {
            const updatedNotes = notes.filter((_, i) => i !== index);
            setNotes(updatedNotes);
          }
        }
      ]
    );
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'personal':
        setShowPersonalInfo(true);
        break;
      case 'notes':
        setShowNotes(true);
        break;
      case 'settings':
        Alert.alert('Ayarlar', 'Bu özellik yakında eklenecek!');
        break;
      case 'help':
        Alert.alert('Yardım', 'Bu özellik yakında eklenecek!');
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Kullanıcı bilgileri yüklenemedi.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profilim</Text>
        <Text style={styles.headerSubtitle}>Kişisel bilgileriniz ve paylaşımlarınız</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileAvatar}>{user.avatar}</Text>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileTitle}>{user.title}</Text>
              <Text style={styles.profileUniversity}>{user.university}</Text>
            </View>
          </View>
          
          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.publications}</Text>
              <Text style={styles.statLabel}>Yayın</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.hIndex}</Text>
              <Text style={styles.statLabel}>h-index</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Takipçi</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Takip</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.addPostButton}
            onPress={() => setShowAddPost(true)}
          >
            <Text style={styles.addPostButtonText}>📝 Yeni Paylaşım Ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menü</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuAction('personal')}
          >
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={styles.menuText}>Kişisel Bilgiler</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuAction('notes')}
          >
            <Text style={styles.menuIcon}>📝</Text>
            <Text style={styles.menuText}>Notlarım</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuAction('settings')}
          >
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Ayarlar</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuAction('help')}
          >
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuText}>Yardım</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => handleMenuAction('logout')}
          >
            <Text style={styles.menuIcon}>🚪</Text>
            <Text style={[styles.menuText, styles.logoutText]}>Çıkış Yap</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Paylaşımlarım</Text>
          
          {userPosts.length === 0 ? (
            <View style={styles.emptyPosts}>
              <Text style={styles.emptyPostsIcon}>📝</Text>
              <Text style={styles.emptyPostsText}>Henüz paylaşım yapmadınız</Text>
              <Text style={styles.emptyPostsSubtext}>
                İlk paylaşımınızı yapmak için yukarıdaki butonu kullanın
              </Text>
            </View>
          ) : (
            userPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Text style={styles.postImage}>{post.image}</Text>
                  <View style={styles.postDetails}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postType}>{post.type}</Text>
                    <Text style={styles.postDate}>{post.date}</Text>
                  </View>
                </View>
                <Text style={styles.postAbstract} numberOfLines={3}>
                  {post.abstract}
                </Text>
                <Text style={styles.postJournal}>{post.journal}</Text>
              </View>
            ))
          )}
        </View>
      </View>

      {/* Yeni Paylaşım Modal */}
      <Modal
        visible={showAddPost}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddPost(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yeni Paylaşım</Text>
              <TouchableOpacity onPress={() => setShowAddPost(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Başlık</Text>
                <TextInput
                  style={styles.input}
                  value={newPost.title}
                  onChangeText={(text) => setNewPost({...newPost, title: text})}
                  placeholder="Çalışmanızın başlığını girin"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Özet (Max 300 kelime)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newPost.abstract}
                  onChangeText={(text) => setNewPost({...newPost, abstract: text})}
                  placeholder="Çalışmanızın özetini girin"
                  multiline
                  numberOfLines={4}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tür</Text>
                <View style={styles.typeButtons}>
                  {(['Makale', 'Tez', 'Kitap'] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeButton,
                        newPost.type === type && styles.typeButtonActive
                      ]}
                      onPress={() => setNewPost({...newPost, type})}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        newPost.type === type && styles.typeButtonTextActive
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Dergi/Kitap Adı</Text>
                <TextInput
                  style={styles.input}
                  value={newPost.journal}
                  onChangeText={(text) => setNewPost({...newPost, journal: text})}
                  placeholder="Dergi veya kitap adını girin"
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowAddPost(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddPost}
              >
                <Text style={styles.saveButtonText}>Paylaş</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Kişisel Bilgiler Modal */}
      <Modal
        visible={showPersonalInfo}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPersonalInfo(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Kişisel Bilgiler</Text>
              <TouchableOpacity onPress={() => setShowPersonalInfo(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Ad Soyad</Text>
                <Text style={styles.infoValue}>{user.name}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Unvan</Text>
                <Text style={styles.infoValue}>{user.title}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Üniversite</Text>
                <Text style={styles.infoValue}>{user.university}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>E-posta</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Yayın Sayısı</Text>
                <Text style={styles.infoValue}>{user.publications}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>h-index</Text>
                <Text style={styles.infoValue}>{user.hIndex}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Notlar Modal */}
      <Modal
        visible={showNotes}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotes(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notlarım</Text>
              <TouchableOpacity onPress={() => setShowNotes(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.notesContainer}>
              <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View style={styles.noteItem}>
                    <Text style={styles.noteText}>{item}</Text>
                    <TouchableOpacity 
                      style={styles.deleteNoteButton}
                      onPress={() => handleDeleteNote(index)}
                    >
                      <Text style={styles.deleteNoteButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                )}
                style={styles.notesList}
              />
              
              <View style={styles.addNoteSection}>
                <TextInput
                  style={styles.noteInput}
                  value={newNote}
                  onChangeText={setNewNote}
                  placeholder="Yeni not ekleyin..."
                  multiline
                />
                <TouchableOpacity 
                  style={styles.addNoteButton}
                  onPress={handleAddNote}
                >
                  <Text style={styles.addNoteButtonText}>Ekle</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    fontSize: 60,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileUniversity: {
    fontSize: 12,
    color: '#666',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  actionsSection: {
    marginBottom: 20,
  },
  addPostButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  addPostButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutText: {
    color: '#f44336',
  },
  menuArrow: {
    fontSize: 18,
    color: '#999',
  },
  postsSection: {
    marginBottom: 20,
  },
  emptyPosts: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 40,
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
  emptyPostsIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyPostsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyPostsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  postImage: {
    fontSize: 40,
    marginRight: 12,
  },
  postDetails: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  postType: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 11,
    color: '#999',
  },
  postAbstract: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  postJournal: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
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
    maxHeight: '90%',
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
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  typeButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  notesContainer: {
    flex: 1,
  },
  notesList: {
    maxHeight: 300,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  deleteNoteButton: {
    marginLeft: 10,
  },
  deleteNoteButtonText: {
    fontSize: 18,
  },
  addNoteSection: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  noteInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 80,
  },
  addNoteButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  addNoteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 