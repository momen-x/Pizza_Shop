// utils/imageUpload.ts

/**
 * رفع صورة إلى السيرفر
 * @param file - ملف الصورة المراد رفعه
 * @returns Promise يحتوي على نتيجة الرفع
 */
export const uploadImageToServer = async (
  file: File
): Promise<{ success: boolean; imageUrl?: string; message: string }> => {
  try {
    // التحقق من صحة الملف قبل الإرسال
    if (!file) {
      return {
        success: false,
        message: 'لم يتم اختيار أي ملف'
      };
    }

    // التحقق من نوع الملف
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: 'نوع الملف غير مدعوم. يُسمح فقط بـ JPEG, PNG, WebP'
      };
    }

    // التحقق من حجم الملف (5MB كحد أقصى)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        message: 'حجم الملف كبير جداً. الحد الأقصى 5MB'
      };
    }

    // إنشاء FormData لإرسال الملف
    const formData = new FormData();
    formData.append('file', file);

    // إرسال الملف إلى API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    // التحقق من استجابة السيرفر
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return {
        success: true,
        imageUrl: result.imageUrl,
        message: result.message || 'تم رفع الصورة بنجاح'
      };
    } else {
      return {
        success: false,
        message: result.message || 'فشل في رفع الصورة'
      };
    }

  } catch (error) {
    console.error('Upload error:', error);
    
    // التعامل مع أخطاء الشبكة
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'خطأ في الاتصال بالسيرفر. تأكد من اتصالك بالإنترنت'
        };
      }
      
      return {
        success: false,
        message: error.message
      };
    }

    return {
      success: false,
      message: 'حدث خطأ غير متوقع أثناء رفع الصورة'
    };
  }
};

/**
 * حذف صورة من السيرفر
 * @param imageUrl - رابط الصورة المراد حذفها
 * @returns Promise يحتوي على نتيجة الحذف
 */
export const deleteImageFromServer = async (
  imageUrl: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // التحقق من وجود رابط الصورة
    if (!imageUrl || !imageUrl.trim()) {
      return {
        success: false,
        message: 'رابط الصورة مطلوب للحذف'
      };
    }

    // إرسال طلب الحذف إلى API
    const response = await fetch('/api/upload/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
    });

    // التحقق من استجابة السيرفر
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return {
        success: true,
        message: result.message || 'تم حذف الصورة بنجاح'
      };
    } else {
      return {
        success: false,
        message: result.message || 'فشل في حذف الصورة'
      };
    }

  } catch (error) {
    console.error('Delete error:', error);
    
    // التعامل مع أخطاء الشبكة
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'خطأ في الاتصال بالسيرفر. تأكد من اتصالك بالإنترنت'
        };
      }
      
      return {
        success: false,
        message: error.message
      };
    }

    return {
      success: false,
      message: 'حدث خطأ غير متوقع أثناء حذف الصورة'
    };
  }
};

/**
 * التحقق من صحة رابط الصورة
 * @param imageUrl - رابط الصورة للتحقق منه
 * @returns Promise<boolean> - true إذا كانت الصورة صالحة
 */
export const validateImageUrl = async (imageUrl: string): Promise<boolean> => {
  try {
    if (!imageUrl || !imageUrl.trim()) {
      return false;
    }

    // محاولة تحميل الصورة للتأكد من صحتها
    const response = await fetch(imageUrl, { method: 'HEAD' });
    
    if (!response.ok) {
      return false;
    }

    // التحقق من نوع المحتوى
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return false;
    }

    return true;

  } catch (error) {
    console.error('Image validation error:', error);
    return false;
  }
};

/**
 * تحويل حجم الملف إلى تنسيق قابل للقراءة
 * @param bytes - حجم الملف بالبايت
 * @returns string - الحجم بصيغة قابلة للقراءة
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * الحصول على امتداد الملف من اسمه
 * @param filename - اسم الملف
 * @returns string - امتداد الملف
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

/**
 * التحقق من أن الملف هو صورة صالحة
 * @param file - الملف للتحقق منه
 * @returns boolean - true إذا كان الملف صورة صالحة
 */
export const isValidImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return allowedTypes.includes(file.type) && file.size <= maxSize;
};

/**
 * معاينة الصورة قبل الرفع
 * @param file - ملف الصورة
 * @returns Promise<string> - Data URL للصورة
 */
export const previewImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!isValidImageFile(file)) {
      reject(new Error('ملف صورة غير صالح'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('فشل في قراءة الملف'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('خطأ في قراءة الملف'));
    };
    
    reader.readAsDataURL(file);
  });
};