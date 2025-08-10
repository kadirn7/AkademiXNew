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
import DataManager, { AcademicPost, Comment } from '../utils/DataManager';

const FeedScreen = () => {
  const [posts, setPosts] = useState<AcademicPost[]>([]);
  const [followingCount, setFollowingCount] = useState(0);
  const [selectedPost, setSelectedPost] = useState<AcademicPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const dataManager = DataManager.getInstance();
    setPosts(dataManager.getPosts());
    setFollowingCount(dataManager.getFollowingCount());
  };

  const handleLike = (postId: string) => {
    const dataManager = DataManager.getInstance();
    dataManager.toggleLike(postId);
    setPosts([...dataManager.getPosts()]);
  };

  const handleShare = (postId: string) => {
    const dataManager = DataManager.getInstance();
    dataManager.toggleShare(postId);
    setPosts([...dataManager.getPosts()]);
    Alert.alert('Başarılı', 'Paylaşım durumu güncellendi!');
  };

  const handleComment = (post: AcademicPost) => {
    setSelectedPost(post);
    const dataManager = DataManager.getInstance();
    setComments(dataManager.getComments(post.id));
    setShowComments(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const dataManager = DataManager.getInstance();
    dataManager.addComment(selectedPost.id, newComment.trim());
    setComments(dataManager.getComments(selectedPost.id));
    setNewComment('');
    setPosts([...dataManager.getPosts()]);
  };

  const handleViewPublications = (academicId: string) => {
    Alert.alert('Yayınlar', 'Bu özellik yakında eklenecek!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Akademik Akış</Text>
        <Text style={styles.headerSubtitle}>Takip ettiğiniz akademisyenlerin çalışmaları</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{posts.length}</Text>
            <Text style={styles.statLabel}>Yeni Paylaşım</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{followingCount}</Text>
            <Text style={styles.statLabel}>Takip Edilen</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {posts.reduce((total, post) => total + post.likes, 0)}
            </Text>
            <Text style={styles.statLabel}>Toplam Beğeni</Text>
          </View>
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Son Paylaşımlar</Text>
          
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.authorInfo}>
                  <Text style={styles.postImage}>{post.image}</Text>
                  <View style={styles.authorDetails}>
                    <Text style={styles.authorName}>{post.author}</Text>
                    <Text style={styles.universityName}>{post.university}</Text>
                    <Text style={styles.postDate}>{post.date}</Text>
                  </View>
                </View>
                <View style={styles.postType}>
                  <Text style={styles.typeBadge}>{post.type}</Text>
                </View>
              </View>
              
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postAbstract} numberOfLines={4}>
                  {post.abstract}
                </Text>
                <Text style={styles.journalInfo}>{post.journal}</Text>
              </View>
              
              <View style={styles.postActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, post.isLiked && styles.actionButtonActive]}
                  onPress={() => handleLike(post.id)}
                >
                  <Text style={[styles.actionIcon, post.isLiked && styles.actionIconActive]}>
                    {post.isLiked ? '❤️' : '🤍'}
                  </Text>
                  <Text style={[styles.actionText, post.isLiked && styles.actionTextActive]}>
                    {post.likes}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleComment(post)}
                >
                  <Text style={styles.actionIcon}>💬</Text>
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>📄</Text>
                  <Text style={styles.actionText}>PDF</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, post.isShared && styles.actionButtonActive]}
                  onPress={() => handleShare(post.id)}
                >
                  <Text style={[styles.actionIcon, post.isShared && styles.actionIconActive]}>
                    {post.isShared ? '📤' : '📤'}
                  </Text>
                  <Text style={[styles.actionText, post.isShared && styles.actionTextActive]}>
                    Paylaş
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Yorumlar Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowComments(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yorumlar</Text>
              <TouchableOpacity onPress={() => setShowComments(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>{item.userName}</Text>
                    <Text style={styles.commentDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.commentContent}>{item.content}</Text>
                </View>
              )}
              style={styles.commentsList}
            />
            
            <View style={styles.addCommentSection}>
              <TextInput
                style={styles.commentInput}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Yorumunuzu yazın..."
                multiline
              />
              <TouchableOpacity 
                style={styles.addCommentButton}
                onPress={handleAddComment}
              >
                <Text style={styles.addCommentButtonText}>Gönder</Text>
              </TouchableOpacity>
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
  postsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postImage: {
    fontSize: 40,
    marginRight: 12,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  universityName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  postDate: {
    fontSize: 11,
    color: '#999',
  },
  postType: {
    marginLeft: 10,
  },
  typeBadge: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  postContent: {
    marginBottom: 15,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  postAbstract: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  journalInfo: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtonActive: {
    backgroundColor: '#e3f2fd',
  },
  actionIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  actionIconActive: {
    color: '#2196F3',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
  actionTextActive: {
    color: '#2196F3',
    fontWeight: 'bold',
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
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  commentsList: {
    maxHeight: 300,
  },
  commentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
  },
  commentContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  addCommentSection: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 80,
  },
  addCommentButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  addCommentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FeedScreen; 