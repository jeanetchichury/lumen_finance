create table if not exists receipts (
    id uuid primary key,
    merchant_name varchar(255) not null,
    purchased_at date not null,
    total_amount numeric(12, 2) not null,
    image_path varchar(1024) not null,
    source varchar(50) not null,
    status varchar(50) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists receipt_items (
    id uuid primary key,
    receipt_id uuid not null references receipts(id) on delete cascade,
    raw_name varchar(255) not null,
    normalized_name varchar(255) not null,
    quantity numeric(12, 3) not null,
    unit varchar(20) not null,
    unit_price numeric(12, 2) not null,
    line_total numeric(12, 2) not null,
    confidence numeric(5, 2) not null,
    requires_review boolean not null default false
);

create table if not exists product_categories (
    id uuid primary key,
    code varchar(100) not null unique,
    name varchar(255) not null
);

create table if not exists financial_categories (
    id uuid primary key,
    code varchar(100) not null unique,
    name varchar(255) not null
);

create table if not exists receipt_processing_jobs (
    id uuid primary key,
    receipt_id uuid not null references receipts(id) on delete cascade,
    status varchar(50) not null,
    attempt_count integer not null default 0,
    error_message text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);
