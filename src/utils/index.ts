import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

export function getRandomPrompt(prompt: string) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id: string, photo: string) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export async function downloadImageDirect(prompt: string, photo: string) {
  FileSaver.saveAs(photo, `download-${prompt}.jpg`);
}

export { default as useSyncCallback } from "./useSyncCallback";
