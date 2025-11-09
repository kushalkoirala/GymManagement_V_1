-- ================================
-- 🏋️ GYM MANAGEMENT DATABASE SETUP
-- ================================

-- Drop existing tables if needed (for development reset)
DROP TABLE IF EXISTS diet_plans CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS gyms CASCADE;

-- =====================
-- 1️⃣ GYMS TABLE
-- =====================
CREATE TABLE gyms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================
-- 2️⃣ MEMBERS TABLE
-- =====================
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  gym_id INTEGER REFERENCES gyms(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  join_date DATE DEFAULT CURRENT_DATE
);

CREATE INDEX idx_members_gym_id ON members(gym_id);

-- =====================
-- 3️⃣ ATTENDANCE TABLE
-- =====================
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'present'
);

CREATE INDEX idx_attendance_member_id ON attendance(member_id);
CREATE INDEX idx_attendance_date ON attendance(date);

-- =====================
-- 4️⃣ DIET PLANS TABLE
-- =====================
CREATE TABLE diet_plans (
  id SERIAL PRIMARY KEY,
  member_id INTEGER REFERENCES members(id) ON DELETE CASCADE,
  generated_on TIMESTAMP DEFAULT NOW(),
  plan TEXT
);

CREATE INDEX idx_diet_member_id ON diet_plans(member_id);

-- =====================
-- 5️⃣ SAMPLE DATA (Optional)
-- =====================
-- Uncomment below if you want test data right away
-- INSERT INTO gyms (name, email, password) VALUES ('FitZone Gym', 'fitzone@gmail.com', 'hashedpassword');
-- INSERT INTO members (gym_id, name, email) VALUES (1, 'Ramesh Sharma', 'ramesh@gmail.com');
-- INSERT INTO attendance (member_id, date, status) VALUES (1, CURRENT_DATE, 'present');
