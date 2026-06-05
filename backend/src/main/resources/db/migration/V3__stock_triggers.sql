CREATE OR REPLACE FUNCTION update_stock_low_flag()
RETURNS TRIGGER AS $$
BEGIN
    NEW.low_stock := NEW.quantity <= NEW.min_threshold;
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_stock_items_low_stock
    BEFORE INSERT OR UPDATE OF quantity, min_threshold ON stock_items
    FOR EACH ROW
    EXECUTE FUNCTION update_stock_low_flag();
