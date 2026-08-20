-- BilimQuiz Supabase Ma'lumotlar Bazasi (SQL Skripti)
-- Ushbu kodni nusxalab Supabase SQL Editor bo'limiga tashlang va 'Run' ni bosing.

-- 1. Profiles (Foydalanuvchilar) jadvali
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher')),
  score INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS (Row Level Security) qoidalari
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);


-- 2. Quizzes (Testlar) jadvali
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subject_id TEXT NOT NULL,
  level TEXT NOT NULL,
  teacher_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Quizzes are viewable by everyone." ON public.quizzes FOR SELECT USING (true);


-- 3. Questions (Savollar) jadvali
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of objects: { id: 'a', text: 'Option A' }
  correct_option TEXT NOT NULL,
  explanation TEXT,
  order_num INTEGER NOT NULL
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Questions are viewable by everyone." ON public.questions FOR SELECT USING (true);


-- 4. Results (Natijalar) jadvali
CREATE TABLE IF NOT EXISTS public.results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  quiz_id TEXT, -- Vaqtinchalik mock data id-lari ('javascript', 'frontend') ishlashi uchun TEXT qilingan
  score INTEGER NOT NULL,
  accuracy INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Results are viewable by everyone." ON public.results FOR SELECT USING (true);
CREATE POLICY "Users can insert own results." ON public.results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Test ma'lumotlarini kiritish (JavaScript Quiz uchun)
-- O'zingiz tahrirlashingiz yoki keyinroq saytdan qo'shishingiz mumkin.

-- 5. Feedbacks jadvali
CREATE TABLE IF NOT EXISTS public.feedbacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert feedbacks." ON public.feedbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view feedbacks." ON public.feedbacks FOR SELECT USING (true);
