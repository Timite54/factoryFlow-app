import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'
import mongoose from 'mongoose'

const userRegister = async () => {
    await connectToDatabase()
    try {
        const existingUser = await User.findOne({ email: "admin@gmail.com" });

        if (existingUser) {
            console.log("⚠️ Un utilisateur avec cet email existe déjà.");
            return;
        }
        const hashPassword = await  bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin",
        })
        await newUser.save();
        console.log("✅ Utilisateur admin créé avec succès.");
    } catch (e) {
        console.error("❌ Erreur lors de la création de l'utilisateur :", e.message);
    } finally {
        await mongoose.connection.close();// Pour fermer la connexion après insertion
    }
}

userRegister();