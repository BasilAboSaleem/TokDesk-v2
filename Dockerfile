# Dockerfile
# استخدم نسخة خفيفة من Node.js
FROM node:20-alpine

# تحديد مجلد العمل داخل الحاوية
WORKDIR /usr/src/app

# نسخ ملفات الحزم وتثبيت الاعتماديات
COPY package*.json ./
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# تعيين البورت
EXPOSE 3000

# أمر التشغيل الافتراضي (يمكن تغييره لاحقًا في Compose)
CMD ["npm", "run", "dev"]
