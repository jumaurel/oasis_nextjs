/**
 * Script interactif pour créer un utilisateur admin via BetterAuth.
 *
 * Usage:
 *   npx tsx scripts/create-user.ts
 */

import * as readline from "readline";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../lib/db";

// Instance dédiée au script, sans disableSignUp
const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    if (hidden) {
      // Masquer la saisie du mot de passe
      process.stdout.write(question);
      const stdin = process.stdin;
      const onData = (char: Buffer) => {
        const str = char.toString();
        if (str === "\n" || str === "\r" || str === "\r\n") {
          stdin.removeListener("data", onData);
          stdin.setRawMode(false);
          process.stdout.write("\n");
          rl.close();
          resolve(value);
        } else if (str === "\u0003") {
          // Ctrl+C
          process.exit();
        } else if (str === "\u007F" || str === "\b") {
          // Backspace
          if (value.length > 0) {
            value = value.slice(0, -1);
            process.stdout.write("\b \b");
          }
        } else {
          value += str;
          process.stdout.write("*");
        }
      };
      let value = "";
      stdin.setRawMode(true);
      stdin.resume();
      stdin.on("data", onData);
    } else {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    }
  });
}

async function main() {
  console.log("=== Création d'un utilisateur admin ===\n");

  const name = await ask("Nom: ");
  const email = await ask("Email: ");
  const password = await ask("Mot de passe: ", true);

  if (!name || !email || !password) {
    console.error("\nErreur: tous les champs sont obligatoires.");
    process.exit(1);
  }

  console.log("\nCréation en cours...");

  try {
    const result = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (!result) {
      console.error("Erreur: résultat vide lors de la création.");
      process.exit(1);
    }

    console.log("\nUtilisateur créé avec succès !");
    console.log(`  Nom:   ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  ID:    ${result.user?.id ?? "N/A"}`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("\nErreur lors de la création:", message);
    process.exit(1);
  }

  process.exit(0);
}

main();
