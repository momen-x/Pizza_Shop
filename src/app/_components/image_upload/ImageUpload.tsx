// // components/ImageUpload.tsx
// "use client";
// import React, { useRef, useState, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FaImage, FaUpload, FaTrash, FaSpinner } from "react-icons/fa";
// import Image from "next/image";
// import { uploadImageToServer } from "@/utils/uploadImageToServer ";
// // import { uploadImageToServer, deleteImageFromServer } from "@/utils/imageUpload";

// interface ImageUploadProps {
//   currentImageUrl?: string;
//   onImageChange: (imageUrl: string) => void;
//   onImageDelete?: () => void;
//   disabled?: boolean;
//   className?: string;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   currentImageUrl,
//   onImageChange,
//   onImageDelete,
//   disabled = false,
//   className = "",
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [dragActive, setDragActive] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || "");
//   const [error, setError] = useState<string>("");

//   // التحقق من صحة الملف
//   const validateFile = (file: File): string | null => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     const maxSize = 5 * 1024 * 1024; // 5MB

//     if (!allowedTypes.includes(file.type)) {
//       return 'نوع الملف غير مدعوم. يُسمح فقط بـ JPEG, PNG, WebP';
//     }

//     if (file.size > maxSize) {
//       return 'حجم الملف كبير جداً. الحد الأقصى 5MB';
//     }

//     return null;
//   };

//   // رفع الصورة
//   const handleFileUpload = useCallback(async (file: File) => {
//     const validationError = validateFile(file);
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setError("");
//     setIsUploading(true);
//     setUploadProgress(0);

//     // محاكاة تقدم الرفع
//     const progressInterval = setInterval(() => {
//       setUploadProgress(prev => Math.min(prev + 10, 90));
//     }, 200);

//     try {
//       const result = await uploadImageToServer(file);
      
//       clearInterval(progressInterval);
//       setUploadProgress(100);

//       if (result.success && result.imageUrl) {
//         setPreviewUrl(result.imageUrl);
//         onImageChange(result.imageUrl);
//       } else {
//         setError(result.message || 'خطأ في رفع الصورة');
//       }
//     } catch (error) {
//       clearInterval(progressInterval);
//       setError('حدث خطأ أثناء رفع الصورة');
//     } finally {
//       setIsUploading(false);
//       setUploadProgress(0);
//     }
//   }, [onImageChange]);

//   // التعامل مع اختيار الملف
//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       handleFileUpload(file);
//     }
//   };

//   // التعامل مع السحب والإفلات
//   const handleDrag = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (disabled || isUploading) return;

//     const file = e.dataTransfer.files?.[0];
//     if (file) {
//       handleFileUpload(file);
//     }
//   }, [disabled, isUploading, handleFileUpload]);

//   // حذف الصورة
//   const handleDeleteImage = async () => {
//     if (!previewUrl) return;

//     setIsUploading(true);
//     try {
//       await deleteImageFromServer(previewUrl);
//       setPreviewUrl("");
//       onImageChange("");
//       if (onImageDelete) {
//         onImageDelete();
//       }
//     } catch (error) {
//       setError('خطأ في حذف الصورة');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // فتح نافذة اختيار الملف
//   const openFileSelector = () => {
//     if (!disabled && !isUploading) {
//       fileInputRef.current?.click();
//     }
//   };

//   return (
//     <div className={`space-y-4 ${className}`}>
//       <Label className="text-sm font-medium">
//         صورة المنتج *
//       </Label>

//       {/* منطقة رفع الصورة */}
//       <div
//         className={`
//           relative border-2 border-dashed rounded-lg transition-all duration-200
//           ${dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300'}
//           ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-orange-400'}
//           ${previewUrl ? 'border-solid border-gray-200' : ''}
//         `}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//         onClick={!previewUrl ? openFileSelector : undefined}
//       >
//         {previewUrl ? (
//           // عرض الصورة المحملة
//           <div className="relative group">
//             <div className="relative w-full h-48 overflow-hidden rounded-lg">
//               <Image
//                 src={previewUrl}
//                 alt="Product preview"
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               />
//             </div>
            
//             {/* أزرار التحكم */}
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
//               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
//                 <Button
//                   type="button"
//                   size="sm"
//                   variant="secondary"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openFileSelector();
//                   }}
//                   disabled={disabled || isUploading}
//                   className="bg-white/90 hover:bg-white text-gray-700"
//                 >
//                   <FaUpload className="w-3 h-3 mr-1" />
//                   تغيير
//                 </Button>
//                 <Button
//                   type="button"
//                   size="sm"
//                   variant="destructive"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteImage();
//                   }}
//                   disabled={disabled || isUploading}
//                   className="bg-red-500/90 hover:bg-red-600"
//                 >
//                   <FaTrash className="w-3 h-3 mr-1" />
//                   حذف
//                 </Button>
//               </div>
//             </div>

//             {/* شريط تقدم الرفع */}
//             {isUploading && (
//               <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 rounded-b-lg">
//                 <div className="flex items-center gap-2">
//                   <FaSpinner className="animate-spin text-orange-500" />
//                   <div className="flex-1 bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-orange-500 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${uploadProgress}%` }}
//                     ></div>
//                   </div>
//                   <span className="text-xs text-gray-600">{uploadProgress}%</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           // منطقة الرفع الفارغة
//           <div className="p-8 text-center">
//             <div className="mx-auto w-16 h-16 text-gray-400 mb-4">
//               {isUploading ? (
//                 <FaSpinner className="w-full h-full animate-spin text-orange-500" />
//               ) : (
//                 <FaImage className="w-full h-full" />
//               )}
//             </div>
            
//             {isUploading ? (
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-700">جاري رفع الصورة...</p>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-orange-500 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-gray-500">{uploadProgress}%</p>
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-700">
//                   اضغط لاختيار صورة أو اسحبها هنا
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   PNG, JPG, WebP حتى 5MB
//                 </p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* رسائل الخطأ */}
//       {error && (
//         <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200">
//           {error}
//         </div>
//       )}

//       {/* حقل الإدخال المخفي */}
//       <Input
//         ref={fileInputRef}
//         type="file"
//         accept="image/jpeg,image/jpg,image/png,image/webp"
//         onChange={handleFileSelect}
//         className="hidden"
//         disabled={disabled || isUploading}
//       />

//       {/* معلومات إضافية */}
//       <div className="text-xs text-gray-500 space-y-1">
//         <p>• الأنواع المدعومة: JPEG, PNG, WebP</p>
//         <p>• الحد الأقصى للحجم: 5 ميجابايت</p>
//         <p>• الأبعاد المنصوح بها: 800×800 بكسل أو أعلى</p>
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;