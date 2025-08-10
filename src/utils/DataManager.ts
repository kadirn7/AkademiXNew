// DataManager.ts - Uygulama verilerini yönetmek için
export interface User {
  id: string;
  email: string;
  name: string;
  title: string;
  university: string;
  avatar: string;
  followers: number;
  following: number;
  publications: number;
  hIndex: number;
  isLoggedIn: boolean;
}

export interface AcademicPost {
  id: string;
  authorId: string;
  author: string;
  university: string;
  title: string;
  abstract: string;
  type: 'Makale' | 'Tez' | 'Kitap';
  journal: string;
  date: string;
  likes: number;
  comments: number;
  pdfUrl: string;
  image: string;
  isLiked: boolean;
  isShared: boolean;
}

export interface Academic {
  id: string;
  name: string;
  title: string;
  university: string;
  department: string;
  publications: number;
  citations: number;
  hIndex: number;
  avatar: string;
  isFollowing: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  content: string;
  date: string;
}

class DataManager {
  private static instance: DataManager;
  private currentUser: User | null = null;
  private posts: AcademicPost[] = [];
  private academics: Academic[] = [];
  private comments: Comment[] = [];
  private userPosts: AcademicPost[] = [];

  private constructor() {
    this.initializeMockData();
  }

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  private initializeMockData() {
    // Mock kullanıcı verisi - kesinlikle giriş yapmamış
    this.currentUser = {
      id: '1',
      email: 'user@example.com',
      name: 'Dr. Ali Yılmaz',
      title: 'Doçent Dr.',
      university: 'İstanbul Teknik Üniversitesi',
      avatar: '👨‍🏫',
      followers: 45,
      following: 12,
      publications: 23,
      hIndex: 8,
      isLoggedIn: false, // Kesinlikle false
    };

    this.initializePosts();
    this.initializeAcademics();
    this.initializeComments();
  }

  private initializePosts() {
    this.posts = [
      {
        id: '1',
        authorId: '2',
        author: 'Prof. Dr. Ahmet Yılmaz',
        university: 'İstanbul Üniversitesi',
        title: 'Yapay Zeka ve Eğitim Teknolojileri',
        abstract: 'Bu çalışmada, yapay zeka teknolojilerinin eğitim alanındaki uygulamaları incelenmiştir. Özellikle kişiselleştirilmiş öğrenme sistemleri ve adaptif eğitim platformları üzerine odaklanılmıştır. Araştırma, 500 öğrenci ile yapılan deneysel çalışmaları içermektedir.',
        type: 'Makale',
        journal: 'Journal of Educational Technology',
        date: '2 saat önce',
        likes: 45,
        comments: 12,
        pdfUrl: '#',
        image: '📚',
        isLiked: false,
        isShared: false,
      },
      {
        id: '2',
        authorId: '3',
        author: 'Dr. Fatma Demir',
        university: 'Ankara Üniversitesi',
        title: 'Sürdürülebilir Kalkınma ve Çevre Politikaları',
        abstract: 'Bu tez çalışmasında, Türkiye\'de sürdürülebilir kalkınma hedeflerinin çevre politikaları ile uyumluluğu analiz edilmiştir. 2010-2023 yılları arasındaki veriler kullanılarak kapsamlı bir değerlendirme yapılmıştır.',
        type: 'Tez',
        journal: 'Doktora Tezi',
        date: '1 gün önce',
        likes: 23,
        comments: 8,
        pdfUrl: '#',
        image: '🎓',
        isLiked: true,
        isShared: false,
      },
      {
        id: '3',
        authorId: '4',
        author: 'Prof. Dr. Mehmet Kaya',
        university: 'Hacettepe Üniversitesi',
        title: 'Nanoteknoloji ve Tıbbi Uygulamalar',
        abstract: 'Nanoteknoloji alanındaki son gelişmelerin tıbbi uygulamalardaki rolü bu araştırmada ele alınmıştır. Özellikle ilaç taşıma sistemleri ve hedefe yönelik tedavi yöntemleri üzerine odaklanılmıştır.',
        type: 'Makale',
        journal: 'Nature Nanotechnology',
        date: '3 gün önce',
        likes: 67,
        comments: 15,
        pdfUrl: '#',
        image: '🔬',
        isLiked: false,
        isShared: true,
      },
    ];
  }

  private initializeAcademics() {
    this.academics = [
      {
        id: '2',
        name: 'Prof. Dr. Ahmet Yılmaz',
        title: 'Profesör',
        university: 'İstanbul Üniversitesi',
        department: 'Bilgisayar Mühendisliği',
        publications: 45,
        citations: 1200,
        hIndex: 15,
        avatar: '👨‍🏫',
        isFollowing: true,
      },
      {
        id: '3',
        name: 'Dr. Fatma Demir',
        title: 'Doçent Dr.',
        university: 'Ankara Üniversitesi',
        department: 'Çevre Mühendisliği',
        publications: 32,
        citations: 850,
        hIndex: 12,
        avatar: '👩‍🏫',
        isFollowing: true,
      },
      {
        id: '4',
        name: 'Prof. Dr. Mehmet Kaya',
        title: 'Profesör',
        university: 'Hacettepe Üniversitesi',
        department: 'Tıp',
        publications: 78,
        citations: 2100,
        hIndex: 22,
        avatar: '👨‍⚕️',
        isFollowing: true,
      },
      {
        id: '5',
        name: 'Dr. Ayşe Özkan',
        title: 'Yardımcı Doçent',
        university: 'Boğaziçi Üniversitesi',
        department: 'Ekonomi',
        publications: 18,
        citations: 320,
        hIndex: 8,
        avatar: '👩‍💼',
        isFollowing: false,
      },
      {
        id: '6',
        name: 'Prof. Dr. Mustafa Arslan',
        title: 'Profesör',
        university: 'ODTÜ',
        department: 'Fizik',
        publications: 56,
        citations: 1800,
        hIndex: 18,
        avatar: '👨‍🔬',
        isFollowing: false,
      },
    ];
  }

  private initializeComments() {
    this.comments = [
      {
        id: '1',
        postId: '1',
        userId: '2',
        userName: 'Dr. Ali Yılmaz',
        content: 'Çok değerli bir çalışma. Özellikle kişiselleştirilmiş öğrenme kısmı çok başarılı.',
        date: '1 saat önce',
      },
      {
        id: '2',
        postId: '1',
        userId: '3',
        userName: 'Prof. Dr. Ahmet Yılmaz',
        content: 'Teşekkürler! Bu alanda daha fazla araştırma yapmayı planlıyoruz.',
        date: '30 dakika önce',
      },
    ];
  }

  // Kullanıcı işlemleri
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  login(email: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Mock login - gerçek uygulamada API çağrısı yapılır
      setTimeout(() => {
        if (email === 'user@example.com' && password === '123456') {
          if (this.currentUser) {
            this.currentUser.isLoggedIn = true;
          }
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  logout(): void {
    if (this.currentUser) {
      this.currentUser.isLoggedIn = false;
    }
  }

  // Post işlemleri
  getPosts(): AcademicPost[] {
    return this.posts;
  }

  toggleLike(postId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
    }
  }

  toggleShare(postId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.isShared = !post.isShared;
    }
  }

  getComments(postId: string): Comment[] {
    return this.comments.filter(c => c.postId === postId);
  }

  addComment(postId: string, content: string): void {
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: this.currentUser?.id || '',
      userName: this.currentUser?.name || '',
      content,
      date: 'Şimdi',
    };
    this.comments.push(newComment);
    
    // Post'un yorum sayısını güncelle
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments += 1;
    }
  }

  // Akademisyen işlemleri
  getAcademics(): Academic[] {
    return this.academics;
  }

  toggleFollow(academicId: string): void {
    const academic = this.academics.find(a => a.id === academicId);
    if (academic) {
      academic.isFollowing = !academic.isFollowing;
    }
  }

  getFollowingCount(): number {
    return this.academics.filter(a => a.isFollowing).length;
  }

  // Kullanıcı paylaşımları
  getUserPosts(): AcademicPost[] {
    return this.userPosts;
  }

  addUserPost(post: Omit<AcademicPost, 'id' | 'authorId' | 'isLiked' | 'isShared'>): void {
    const newPost: AcademicPost = {
      ...post,
      id: Date.now().toString(),
      authorId: this.currentUser?.id || '',
      isLiked: false,
      isShared: false,
    };
    this.userPosts.unshift(newPost);
  }
}

export default DataManager; 