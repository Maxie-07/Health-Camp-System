CREATE INDEX idx_beneficiaries_qr_code ON beneficiaries(qr_code);
CREATE INDEX idx_visits_beneficiary_id ON visits(beneficiary_id);
CREATE INDEX idx_visits_visit_date ON visits(visit_date);
CREATE INDEX idx_stock_items_sku ON stock_items(sku);
CREATE INDEX idx_stock_items_low_stock ON stock_items(low_stock) WHERE low_stock = TRUE;
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
