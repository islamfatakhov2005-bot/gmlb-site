#!/usr/bin/env python3
"""
🎙️ Скрипт для голосовой диктовки на русском языке.
Использует Google Speech Recognition API (бесплатно, нужен интернет).
"""

import speech_recognition as sr
import sys
import subprocess

def listen_and_transcribe():
    """Слушает микрофон и распознает речь."""
    recognizer = sr.Recognizer()
    
    # Настройка микрофона
    with sr.Microphone() as source:
        print("🎤 Настройка микрофона... подождите...")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print("✅ Готов к записи! Говорите (или нажмите Ctrl+C для выхода).")
        
        while True:
            try:
                print("\n🔴 Запись...")
                audio = recognizer.listen(source, phrase_time_limit=15)
                
                print("⏳ Распознавание...")
                
                # Распознавание через Google API
                try:
                    text = recognizer.recognize_google(audio, language="ru-RU")
                    print(f"✅ Вы сказали: {text}")
                    
                    # Копирование в буфер обмена
                    subprocess.run(["clip"], input=text.encode("utf-8"), check=True)
                    print("📋 Текст скопирован в буфер обмена!")
                    
                except sr.UnknownValueError:
                    print("❌ Не удалось распознать речь.")
                except sr.RequestError as e:
                    print(f"❌ Ошибка сервиса: {e}")
                    
            except KeyboardInterrupt:
                print("\n👋 Выход из программы.")
                break
            except Exception as e:
                print(f"❌ Ошибка: {e}")
                break

def main():
    print("=" * 50)
    print("🎙️  Голосовая диктовка (русский язык)")
    print("=" * 50)
    
    # Проверка наличия микрофона
    try:
        microphones = sr.Microphone.list_microphone_names()
        if not microphones:
            print("❌ Микрофон не найден!")
            sys.exit(1)
        print(f"📍 Найдено микрофонов: {len(microphones)}")
        for i, name in enumerate(microphones):
            print(f"   {i+1}. {name}")
    except Exception as e:
        print(f"❌ Ошибка доступа к микрофону: {e}")
        sys.exit(1)
    
    listen_and_transcribe()

if __name__ == "__main__":
    main()
