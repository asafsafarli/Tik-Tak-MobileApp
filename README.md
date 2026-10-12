# TikTak — Mobil App

TikTak e-commerce platformasının müştəri üçün mobil tətbiqi. Eyni kod həm **iOS**, həm də **Android** üzərində işləyir.

## İmkanlar

- **Açılış animasiyası** — loqodan başlayan "tik-tak" intro: ekran yaşıla boyanır, məhsullar səbətə səpələnir, sonra app açılır (telefonda "Reduce Motion" açıqdırsa qısa keçid)
- **Giriş / Qeydiyyat** — telefon nömrəsi (`+994` prefiksi hazırdır) və parol ilə; sessiya telefonda təhlükəsiz saxlanılır və token vaxtı bitəndə avtomatik yenilənir
- **Əsas səhifə** — çatdırılma ünvanı, kampaniya banneri, kateqoriyalar
- **Məhsullar** — kateqoriyaya görə siyahı, səhifələmə (infinite scroll), məhsul detalı (bottom sheet)
- **Axtarış** — yazdıqca nəticələr
- **Səbət** — miqdarı artırıb-azaltmaq, dərhal yenilənən interfeys (optimistic update)
- **Sifariş** — ünvan, telefon, qeyd, nağd / kartla ödəniş; uğurlu sifarişdən sonra sifariş tarixçəsinə yönləndirmə
- **Hesabım** — profil şəkli yükləmə, hesab məlumatlarını redaktə, favoritlər (Siyahılarım), sifariş tarixçəsi

## Texnologiyalar

| Sahə | Texnologiya |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 57, React Native 0.86, React 19 |
| Dil | TypeScript |
| Naviqasiya | Expo Router (fayl əsaslı) |
| Server data | TanStack React Query |
| HTTP | Axios |
| Token saxlama | expo-secure-store |
| Şəkillər | expo-image, expo-image-picker |
| Şrift | Roboto (`@expo-google-fonts/roboto`) |

## Tələblər

- [Node.js](https://nodejs.org) 20.19.4 və ya daha yeni
- **iOS üçün:** Xcode, iOS Simulator və [CocoaPods](https://cocoapods.org) (yalnız macOS)
- **Android üçün:** Android Studio, Android SDK və ən azı bir virtual cihaz (AVD)

## Quraşdırma

```bash
git clone https://github.com/asafsafarli/Tik-Tak-MobileApp.git
cd Tik-Tak-MobileApp
npm install
```

### Android SDK və Java yolu (bir dəfəlik)

`~/.zshrc` faylına əlavə edin və terminalı yenidən açın:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
export PATH=$JAVA_HOME/bin:$PATH
```

## İşə salmaq

Layihə **development build** kimi işləyir: simulatorda Expo Go-dan ayrı, öz ikonu olan **TikTak** app-ı qurulur və birbaşa app-ın ilk ekranı açılır.

### İlk dəfə (və ya native ayarlar dəyişəndə)

```bash
npm run ios       # iOS app-ı build edib simulatora qurur
npm run android   # Android app-ı build edib emulatora qurur
```

Bu əmrlər `ios/` və `android/` qovluqlarını yaradır (git-ə düşmür, əllə dəyişdirilmir). İlk build bir neçə dəqiqə çəkir.

Yenidən build **yalnız** bu hallarda lazımdır:

- native kodu olan paket əlavə ediləndə (kamera, xəritə, push bildiriş və s.)
- `app.json` dəyişəndə (ad, ikon, splash, plugin-lər, icazə mətnləri)
- Expo SDK versiyası yüksəldiləndə
- simulatorda TikTak app-ı silinəndə və ya yeni cihaz istifadə ediləndə

`src/` içindəki kod, yeni ekranlar, şəkillər və yalnız JavaScript paketləri üçün build lazım deyil — Fast Refresh kifayətdir.

### Gündəlik iş

```bash
npm start
```

Sonra simulatorda **TikTak** ikonuna basın və ya terminalda `i` / `a` basın.

> Expo Go ilə açmaq lazım olsa: `npx expo start --go`

Server işləyərkən terminalda:

| Düymə | Nə edir |
|---|---|
| `i` | iOS simulatorunda açır |
| `a` | Android emulatorunda açır |
| `r` | App-ı yenidən yükləyir |
| `j` | Debugger-i açır |

Kodda dəyişiklik edib yadda saxlayanda app avtomatik yenilənir (Fast Refresh).

> Yeni ekran (route faylı) əlavə edəndən və ya silələndən sonra app köhnə ekranı göstərirsə, serveri keşi təmizləyərək başladın: `npm start -- -c`

## Telefona quraşdırmaq

### Android — APK

```bash
cd android && ./gradlew assembleRelease
```

Fayl: `android/app/build/outputs/apk/release/app-release.apk`. JavaScript kodu APK-nın içindədir, app serversiz işləyir.

APK-nı telefona göndərin (Telegram, Google Drive, USB kabel) və açın. Android "naməlum mənbə" üçün icazə istəyəcək — həmin app üçün icazə verin, sonra **Quraşdır**.

> APK Android-in standart debug açarı ilə imzalanır: test və paylaşmaq üçün uyğundur, **Google Play üçün deyil**. Play Store üçün öz imza açarınız (keystore) lazımdır.

### iPhone — kabel ilə

Pulsuz Apple ID kifayətdir. Bir dəfəlik hazırlıq:

1. **Xcode → Settings → Accounts** → "+" → Apple ID ilə daxil olun
2. iPhone-u kabellə qoşun, telefonda **Trust This Computer** → **Trust**
3. iPhone-da **Settings → Privacy & Security → Developer Mode** → aktiv edin (telefon yenidən başlayır). Bu seçim telefon Xcode-a ilk dəfə qoşulandan sonra görünür.

Quraşdırma:

```bash
npx expo run:ios --device --configuration Release
```

İlk açılışda iPhone-da: **Settings → General → VPN & Device Management** → öz Apple ID-niz → **Trust**.

> Pulsuz Apple ID ilə app **7 gün** işləyir, sonra eyni əmrlə yenidən quraşdırılır. Developer Mode açıq qalmalıdır — söndürüləndə app açılmır. Daimi quraşdırma və TestFlight üçün Apple Developer Program (illik 99$) lazımdır.

## Yoxlamalar

```bash
npx tsc --noEmit   # TypeScript yoxlaması
npm run lint       # ESLint
npx expo-doctor    # asılılıqların uyğunluğu
```

Paket əlavə edərkən həmişə `npx expo install <paket>` istifadə edin — Expo SDK-ya uyğun versiyanı seçir.

## Layihənin quruluşu

```
src/
├── app/                    # Ekranlar (Expo Router)
│   ├── _layout.tsx         # Şriftlər, provider-lər, giriş yoxlaması
│   ├── (auth)/             # Giriş etməmiş istifadəçi: welcome, login, signup
│   └── (app)/              # Giriş etmiş istifadəçi
│       ├── (tabs)/         # Alt menyu: Əsas, Axtar, Hesabım
│       ├── product/[id]    # Məhsul detalı (bottom sheet)
│       ├── order/[id]      # Sifariş detalı (bottom sheet)
│       ├── cart            # Səbət
│       ├── checkout        # Sifarişi tamamla
│       └── order-success   # Uğurlu sifariş
├── api/                    # API qatı: client, servislər, tiplər
├── components/             # Təkrar istifadə olunan UI komponentləri (intro/ — açılış animasiyası)
├── context/                # AuthContext (sessiya vəziyyəti)
├── hooks/                  # React Query hook-ları (səbət, kataloq, sifarişlər)
├── lib/                    # React Query client
├── constants/              # Rənglər, şriftlər, ölçülər
└── utils/                  # Format və telefon köməkçiləri
assets/
├── images/                 # App-da istifadə olunan şəkillər
└── design/                 # Dizayndan gələn orijinal fayllar
```

`@/` qısa yolu `src/`, `@assets/` isə `assets/` qovluğuna işarə edir.

## API

Base URL: `https://api.sarkhanrahimli.dev/api/tiktak` (`src/api/config.ts`)

Bütün sorğular `Authorization: Bearer <access_token>` başlığı ilə göndərilir. Token vaxtı bitəndə `src/api/client.ts` onu refresh token ilə avtomatik yeniləyir; refresh də uğursuz olarsa, istifadəçi giriş ekranına qaytarılır.

Backend-in bilinməli xüsusiyyətləri:

- Telefon nömrəsi `+994XXXXXXXXX` formatında göndərilir; istifadəçi `+994`-dən sonrakı hissəni yazır (`50 123 45 67`), app nömrəni özü çevirir (`050...` və tam `+994...` də qəbul olunur)
- Qeydiyyat token qaytarmır — app qeydiyyatdan sonra avtomatik login edir
- `PUT /profile` üçün `full_name` və `address` mütləqdir; telefon dəyişdirilmir
- Server şifrə ilə şifrə təkrarını müqayisə etmir — bu yoxlama app-da edilir
- Səbət endpoint-ləri məhsul ID-si ilə işləyir və həmişə yenilənmiş səbəti qaytarır; `count` — məhsulların ümumi miqdarıdır
- `POST /products/:id/favorite` favoriti əlavə edir və ya silir (toggle)
- `GET /orders/user/:id` cavabı standart `{ message, data }` qabığı olmadan gəlir
