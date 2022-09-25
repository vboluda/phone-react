db.createUser(
    {
        user: "phone",
        pwd: "phone01",
        roles: [
            {
                role: "readWrite",
                db: "test"
            }
        ]
    }
);