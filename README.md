# AkademiX - Eğitim Platformu

AkademiX, öğrencilerin online eğitim alabilecekleri, kursları takip edebilecekleri ve ilerlemelerini görebilecekleri modern bir mobil uygulamadır.

## 🚀 Özellikler

- **Ana Sayfa**: Hızlı erişim kartları ve son aktiviteler
- **Kurslar**: Mevcut kursları görüntüleme ve katılma
- **Profil**: Kullanıcı profili ve istatistikler
- **Modern UI**: Kullanıcı dostu ve modern arayüz
- **Responsive Design**: Farklı ekran boyutlarına uyumlu

## 📱 Teknolojiler

- **React Native**: Cross-platform mobil uygulama geliştirme
- **Expo**: Hızlı geliştirme ve test süreci
- **TypeScript**: Tip güvenliği
- **React Navigation**: Sayfa geçişleri
- **React Native Elements**: UI bileşenleri

## 🛠️ Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone <repository-url>
   cd AkademiX
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Uygulamayı başlatın**
   ```bash
   npm start
   ```

4. **Test için**
   - Android: `npm run android`
   - iOS: `npm run ios` (macOS gerekli)
   - Web: `npm run web`

## 📁 Proje Yapısı

```
AkademiX/
├── src/
│   ├── components/     # Yeniden kullanılabilir bileşenler
│   ├── screens/        # Ekran bileşenleri
│   ├── navigation/     # Navigation yapısı
│   ├── services/       # API servisleri
│   ├── utils/          # Yardımcı fonksiyonlar
│   ├── types/          # TypeScript tip tanımları
│   ├── constants/      # Sabitler
│   └── hooks/          # Custom React hooks
├── assets/             # Resimler, fontlar vb.
├── App.tsx            # Ana uygulama bileşeni
└── package.json       # Proje bağımlılıkları
```

## 🎨 Ekranlar

### Ana Sayfa
- Hızlı erişim kartları (Kurslar, Sınavlar, Profil, Ayarlar)
- Son aktiviteler listesi
- Kullanıcı istatistikleri

### Kurslar
- Mevcut kursların listesi
- Kurs detayları (eğitmen, süre, öğrenci sayısı, puan)
- Kursa katılma butonu

### Profil
- Kullanıcı bilgileri
- İstatistikler (tamamlanan kurs, toplam puan, günlük seri, ortalama)
- Menü seçenekleri

## 🔧 Geliştirme

### Yeni Ekran Ekleme
1. `src/screens/` klasöründe yeni ekran dosyası oluşturun
2. `src/navigation/AppNavigator.tsx` dosyasına ekranı ekleyin
3. Gerekirse tab bar ikonunu güncelleyin

### Yeni Bileşen Ekleme
1. `src/components/` klasöründe bileşen dosyası oluşturun
2. TypeScript tip tanımlarını `src/types/` klasöründe yapın
3. Bileşeni ilgili ekranlarda import edin

## 📱 Test

### Expo Go ile Test
1. Telefonunuza Expo Go uygulamasını indirin
2. `npm start` komutunu çalıştırın
3. QR kodu Expo Go ile tarayın

### Emülatör ile Test
1. Android Studio veya Xcode kurun
2. Emülatör başlatın
3. `npm run android` veya `npm run ios` komutunu çalıştırın

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Proje Sahibi: [İsim]
- Email: [email@example.com]
- Proje Linki: [https://github.com/username/AkademiX]

---

**AkademiX** - Eğitimde dijital dönüşüm 🎓

<!-- Test push - Write access verification --> 