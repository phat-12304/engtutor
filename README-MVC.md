# EngTutor Frontend - Cấu trúc MVC

## 📁 **Cấu trúc thư mục**

```
src/
├── components/          # UI Components (View)
├── pages/              # Các trang (View)
├── services/           # Xử lý logic nghiệp vụ (Model)
├── controllers/        # Điều khiển luồng xử lý (Controller)
├── shared/             # API, Store, Utilities
├── hooks/              # Custom React Hooks
└── assets/             # Hình ảnh, icons
```

## 🔧 **Cách hoạt động**

### **1. Services (Model)**
- Chứa logic nghiệp vụ
- Gọi API, xử lý dữ liệu
- Không chứa UI

**Ví dụ:**
```typescript
// AuthService.ts - Xử lý đăng nhập
export class AuthService {
  static async login(email: string, password: string) {
    const response = await Api.auth.login({ email, password })
    return response.data
  }
}
```

### **2. Controllers (Controller)**  
- Điều khiển luồng xử lý
- Kết nối View với Services
- Xử lý tương tác người dùng

**Ví dụ:**
```typescript
// HomeController.ts - Điều khiển trang chủ
export class HomeController {
  startCountAnimation(element: Element) {
    // Gọi AnimationService để xử lý animation
    this.observer = AnimationService.createIntersectionObserver(...)
  }
}
```

### **3. Components/Pages (View)**
- Chỉ hiển thị UI
- Không chứa logic nghiệp vụ
- Sử dụng Controllers để xử lý

**Ví dụ:**
```typescript
// HomePage.tsx - Chỉ hiển thị giao diện
function HomePage() {
  const homeController = new HomeController(...)
  
  return (
    <div>
      <h1>Trang chủ</h1>
      {/* UI components */}
    </div>
  )
}
```
