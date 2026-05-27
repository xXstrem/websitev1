-- Hosting Schema Extension Migration
-- Adds missing tables and fields for a complete hosting management system

-- ============================================
-- 1. ADMIN_USERS TABLE (NEW)
-- ============================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin', 'support')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);

-- ============================================
-- 2. SITE_STATS TABLE (NEW)
-- ============================================
CREATE TABLE site_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stat_name VARCHAR(100) NOT NULL UNIQUE,
    value VARCHAR(255) NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_site_stats_name ON site_stats(stat_name);

-- ============================================
-- 3. ADD MISSING COLUMNS TO EXISTING TABLES
-- ============================================

-- Add last_reply_at to support_tickets
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS last_reply_at TIMESTAMPTZ;

-- Add staff_id to ticket_messages (renamed from ticket_replies concept)
ALTER TABLE ticket_messages 
ADD COLUMN IF NOT EXISTS staff_id UUID;

-- Add overdue status to invoices if not present
ALTER TABLE invoices 
DROP CONSTRAINT IF EXISTS invoices_status_check;

ALTER TABLE invoices 
ADD CONSTRAINT invoices_status_check 
CHECK (status IN ('draft', 'pending', 'paid', 'overdue', 'cancelled'));

-- Update support_tickets status constraint to include new statuses
ALTER TABLE support_tickets 
DROP CONSTRAINT IF EXISTS support_tickets_status_check;

ALTER TABLE support_tickets 
ADD CONSTRAINT support_tickets_status_check 
CHECK (status IN ('open', 'in_progress', 'waiting_customer', 'resolved', 'closed'));

-- Update support_tickets priority constraint to include urgent
ALTER TABLE support_tickets 
DROP CONSTRAINT IF EXISTS support_tickets_priority_check;

ALTER TABLE support_tickets 
ADD CONSTRAINT support_tickets_priority_check 
CHECK (priority IN ('low', 'medium', 'high', 'urgent'));

-- Update support_tickets department constraint for allowed values
ALTER TABLE support_tickets 
DROP CONSTRAINT IF EXISTS support_tickets_department_check;

ALTER TABLE support_tickets 
ADD CONSTRAINT support_tickets_department_check 
CHECK (department IN ('technical', 'billing', 'sales', 'general'));

-- Add missing columns to orders
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS service_type VARCHAR(50);

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS plan_name VARCHAR(100);

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS domain VARCHAR(255);

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);

-- Update orders status constraint
ALTER TABLE orders 
DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE orders 
ADD CONSTRAINT orders_status_check 
CHECK (status IN ('pending', 'paid', 'active', 'cancelled', 'expired'));

-- Add server_name to services (if not exists)
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS server_name VARCHAR(100);

-- Add specs column to services if not exists
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS specs JSONB;

-- Update services status constraint
ALTER TABLE services 
DROP CONSTRAINT IF EXISTS services_status_check;

ALTER TABLE services 
ADD CONSTRAINT services_status_check 
CHECK (status IN ('active', 'suspended', 'expired', 'cancelled'));

-- ============================================
-- 4. RLS POLICIES FOR NEW TABLES
-- ============================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Admin Users: Strict access control (service role only for authentication)
CREATE POLICY "No direct access to admin_users" ON admin_users
    FOR ALL USING (false);

-- Site Stats: Read-only for all authenticated users
CREATE POLICY "Users can view site stats" ON site_stats
    FOR SELECT USING (true);

CREATE POLICY "Service role can manage site stats" ON site_stats
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- 5. TRIGGERS
-- ============================================

-- Trigger for last_reply_at update on support_tickets
CREATE OR REPLACE FUNCTION update_ticket_last_reply()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE support_tickets
    SET last_reply_at = NOW()
    WHERE id = NEW.ticket_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_last_reply
    AFTER INSERT ON ticket_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_ticket_last_reply();

-- Trigger for site_stats updated_at
CREATE OR REPLACE FUNCTION update_site_stats_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_site_stats
    BEFORE UPDATE ON site_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_site_stats_timestamp();

-- ============================================
-- 6. SAMPLE DATA
-- ============================================

-- Insert super admin with bcrypt hash for password 'Ahmed2026$'
-- bcrypt hash generated with cost factor 12
INSERT INTO admin_users (email, password_hash, name, role, is_active)
VALUES (
    'admin@ton-cloud.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.G.4oF.C8Yq4D.K',
    'System Administrator',
    'super_admin',
    TRUE
);

-- Insert sample site stats
INSERT INTO site_stats (stat_name, value, updated_at) VALUES
    ('total_customers', '15000', NOW()),
    ('active_servers', '2500', NOW()),
    ('uptime_percentage', '99.99', NOW()),
    ('countries_served', '45', NOW()),
    ('support_response_time', '< 5 minutes', NOW()),
    ('total_domains', '50000', NOW()),
    ('years_in_business', '10', NOW()),
    ('datacenter_locations', '12', NOW()),
    ('vps_plans_available', '15', NOW()),
    ('dedicated_servers', '200', NOW());

-- ============================================
-- 7. COMMENTS FOR DOCUMENTATION
-- ============================================
COMMENT ON TABLE admin_users IS 'Administrative users for backend management with role-based access';
COMMENT ON TABLE site_stats IS 'Static statistics displayed on the website homepage and dashboard';
COMMENT ON TABLE orders IS 'Customer orders for VPS, dedicated servers, domains, and other hosting services';
COMMENT ON TABLE services IS 'Active services provisioned for customers';
COMMENT ON TABLE support_tickets IS 'Customer support ticket tracking';
COMMENT ON TABLE ticket_messages IS 'Conversation thread for support tickets';
COMMENT ON TABLE invoices IS 'Customer billing invoices';
