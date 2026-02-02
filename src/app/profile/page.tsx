import ProfileView from '@/features/profile/components/ProfileView';

// ProfilePage: Bu fonksiyon, '/profile' adresine girildiğinde çalışan ana bileşendir.
export default function ProfilePage() {
  
  // 1. MODÜLER YAPI (Sorumlulukların Ayrılması)
  // Sayfanın kendisi çok sade tutulmuştur. 
  // Tüm görsel tasarım ve mantık 'ProfileView' bileşenine devredilmiştir.
  // Bu yöntem, kodun okunabilirliğini artırır ve testi kolaylaştırır.
  
  return <ProfileView />;
}