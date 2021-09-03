BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined ) values ('anon', 'anon@gmail.com', 5, '2021-01-01');

INSERT into login (hash, email) values ('$2a$10$yqcj2WTC6sO7KJvH6lXgRup41CSr5uRP25dkHRFxVNhyj6JRGQJJO', 'anon@gmail.com');

COMMIT;