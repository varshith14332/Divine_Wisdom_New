#!/usr/bin/env python3
"""
Divine Wisdom - Bhagavad Gita Data Processor
Processes the 700 verses of the Bhagavad Gita into training format
"""

import json
import re
import pandas as pd
from typing import List, Dict, Any
from pathlib import Path
import yaml

class GitaProcessor:
    def __init__(self, input_file: str, output_dir: str):
        self.input_file = Path(input_file)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Gita themes and categories for better training
        self.themes = {
            'duty_dharma': ['duty', 'dharma', 'righteousness', 'obligation', 'responsibility'],
            'detachment': ['detachment', 'non-attachment', 'vairagya', 'letting go'],
            'action_karma': ['action', 'karma', 'work', 'deed', 'activity'],
            'devotion_bhakti': ['devotion', 'love', 'surrender', 'faith', 'bhakti'],
            'knowledge_jnana': ['knowledge', 'wisdom', 'understanding', 'realization'],
            'mind_control': ['mind', 'meditation', 'concentration', 'focus', 'mental discipline'],
            'inner_peace': ['peace', 'tranquility', 'serenity', 'calm', 'stillness'],
            'purpose_meaning': ['purpose', 'meaning', 'goal', 'direction', 'path'],
            'fear_anxiety': ['fear', 'anxiety', 'worry', 'doubt', 'uncertainty'],
            'relationships': ['relationship', 'friendship', 'family', 'social', 'interaction']
        }

    def process_gita_text(self, text_format: str = "structured") -> List[Dict]:
        """
        Process Gita verses from various input formats
        
        Expected input formats:
        1. structured: JSON/YAML with chapter, verse, sanskrit, translation
        2. plain_text: Simple text format
        3. csv: Spreadsheet format
        """
        
        if text_format == "structured":
            return self._process_structured_format()
        elif text_format == "plain_text":
            return self._process_plain_text()
        elif text_format == "csv":
            return self._process_csv_format()
        
    def _process_structured_format(self) -> List[Dict]:
        """Process structured JSON/YAML format"""
        verses = []
        
        # Example structure - adapt to your data format
        sample_structure = {
            "chapters": [
                {
                    "number": 1,
                    "title": "Arjuna Vishada Yoga",
                    "verses": [
                        {
                            "number": 1,
                            "sanskrit": "धृतराष्ट्र उवाच...",
                            "transliteration": "dhritarashtra uvacha...",
                            "translation": "Dhritarashtra said...",
                            "commentary": "This verse establishes...",
                            "themes": ["duty", "conflict"]
                        }
                    ]
                }
            ]
        }
        
        try:
            if self.input_file.suffix in ['.json']:
                with open(self.input_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            elif self.input_file.suffix in ['.yaml', '.yml']:
                with open(self.input_file, 'r', encoding='utf-8') as f:
                    data = yaml.safe_load(f)
            
            for chapter in data.get('chapters', []):
                chapter_num = chapter.get('number')
                chapter_title = chapter.get('title', '')
                
                for verse in chapter.get('verses', []):
                    processed_verse = self._create_verse_entry(
                        chapter_num, 
                        verse.get('number'),
                        verse.get('sanskrit', ''),
                        verse.get('transliteration', ''),
                        verse.get('translation', ''),
                        verse.get('commentary', ''),
                        verse.get('themes', [])
                    )
                    verses.append(processed_verse)
                    
        except Exception as e:
            print(f"Error processing structured format: {e}")
            return []
            
        return verses

    def _process_plain_text(self) -> List[Dict]:
        """Process plain text format with regex patterns"""
        verses = []
        
        with open(self.input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex patterns to extract verses - adapt to your text format
        chapter_pattern = r'Chapter (\d+)'
        verse_pattern = r'(\d+\.\d+)\s*([^\n]*sanskrit[^\n]*)\s*([^\n]*translation[^\n]*)'
        
        chapters = re.split(chapter_pattern, content)
        
        for i in range(1, len(chapters), 2):
            chapter_num = int(chapters[i])
            chapter_content = chapters[i + 1]
            
            verse_matches = re.findall(verse_pattern, chapter_content, re.MULTILINE)
            
            for verse_ref, sanskrit, translation in verse_matches:
                chapter, verse = map(int, verse_ref.split('.'))
                
                processed_verse = self._create_verse_entry(
                    chapter, verse, sanskrit, '', translation, '', []
                )
                verses.append(processed_verse)
        
        return verses

    def _process_csv_format(self) -> List[Dict]:
        """Process CSV format"""
        verses = []
        
        try:
            df = pd.read_csv(self.input_file)
            
            for _, row in df.iterrows():
                processed_verse = self._create_verse_entry(
                    row.get('chapter', 0),
                    row.get('verse', 0),
                    row.get('sanskrit', ''),
                    row.get('transliteration', ''),
                    row.get('translation', ''),
                    row.get('commentary', ''),
                    row.get('themes', '').split(',') if row.get('themes') else []
                )
                verses.append(processed_verse)
                
        except Exception as e:
            print(f"Error processing CSV format: {e}")
            return []
            
        return verses

    def _create_verse_entry(self, chapter: int, verse: int, sanskrit: str, 
                           transliteration: str, translation: str, 
                           commentary: str, themes: List[str]) -> Dict:
        """Create standardized verse entry"""
        
        # Auto-detect themes if not provided
        if not themes:
            themes = self._detect_themes(translation + ' ' + commentary)
        
        return {
            "id": f"BG_{chapter}_{verse}",
            "chapter": chapter,
            "verse": verse,
            "reference": f"Bhagavad Gita {chapter}.{verse}",
            "sanskrit": sanskrit.strip(),
            "transliteration": transliteration.strip(),
            "translation": translation.strip(),
            "commentary": commentary.strip(),
            "themes": themes,
            "length": len(translation.split()),
            "complexity": self._assess_complexity(translation, commentary),
            "psychological_applications": self._identify_psychological_connections(translation, commentary)
        }

    def _detect_themes(self, text: str) -> List[str]:
        """Auto-detect themes in verse text"""
        detected = []
        text_lower = text.lower()
        
        for theme, keywords in self.themes.items():
            if any(keyword in text_lower for keyword in keywords):
                detected.append(theme)
                
        return detected[:3]  # Limit to top 3 themes

    def _assess_complexity(self, translation: str, commentary: str) -> str:
        """Assess conceptual complexity of verse"""
        total_text = translation + ' ' + commentary
        word_count = len(total_text.split())
        
        complex_concepts = ['consciousness', 'metaphysical', 'transcendental', 'absolute', 'divine']
        complexity_score = sum(1 for concept in complex_concepts if concept in total_text.lower())
        
        if word_count > 50 or complexity_score > 2:
            return "high"
        elif word_count > 25 or complexity_score > 0:
            return "medium"
        else:
            return "basic"

    def _identify_psychological_connections(self, translation: str, commentary: str) -> List[str]:
        """Identify potential connections to psychology"""
        text = (translation + ' ' + commentary).lower()
        
        psychological_keywords = {
            'cognitive': ['mind', 'thought', 'thinking', 'perception', 'awareness'],
            'emotional': ['emotion', 'feeling', 'mood', 'anger', 'fear', 'joy'],
            'behavioral': ['action', 'behavior', 'habit', 'practice', 'discipline'],
            'therapeutic': ['peace', 'healing', 'balance', 'growth', 'transformation'],
            'mindfulness': ['present', 'awareness', 'attention', 'meditation', 'focus']
        }
        
        connections = []
        for category, keywords in psychological_keywords.items():
            if any(keyword in text for keyword in keywords):
                connections.append(category)
                
        return connections

    def create_training_dataset(self, verses: List[Dict]) -> List[Dict]:
        """Create training examples for AI fine-tuning"""
        training_examples = []
        
        # Generate various types of training examples
        for verse in verses:
            # 1. Direct verse explanation
            training_examples.append({
                "prompt": f"Explain the meaning of Bhagavad Gita {verse['chapter']}.{verse['verse']}",
                "completion": f"In Bhagavad Gita {verse['chapter']}.{verse['verse']}, Krishna teaches: \"{verse['translation']}\" {verse['commentary']}",
                "source": "gita",
                "themes": verse['themes'],
                "complexity": verse['complexity']
            })
            
            # 2. Practical application questions
            for theme in verse['themes']:
                practical_question = self._generate_practical_question(theme, verse)
                if practical_question:
                    training_examples.append(practical_question)
            
            # 3. Psychology integration examples
            for psych_connection in verse['psychological_applications']:
                integration_example = self._create_psychology_integration(verse, psych_connection)
                if integration_example:
                    training_examples.append(integration_example)
        
        return training_examples

    def _generate_practical_question(self, theme: str, verse: Dict) -> Dict:
        """Generate practical application questions"""
        question_templates = {
            'duty_dharma': "How can I understand my duty in life?",
            'detachment': "I'm too attached to outcomes and it's causing stress. What should I do?",
            'action_karma': "How do I act without creating negative karma?",
            'mind_control': "My mind is always restless. How can I find peace?",
            'fear_anxiety': "I'm struggling with fear and anxiety. What wisdom can help?",
            'purpose_meaning': "I feel lost and don't know my life's purpose. Can you guide me?"
        }
        
        if theme not in question_templates:
            return None
            
        return {
            "prompt": question_templates[theme],
            "completion": f"The Bhagavad Gita offers guidance on this. In verse {verse['chapter']}.{verse['verse']}, Krishna teaches: \"{verse['translation']}\" This means in practical terms: {self._create_practical_application(verse, theme)}",
            "source": "gita_application",
            "themes": [theme],
            "complexity": verse['complexity']
        }

    def _create_practical_application(self, verse: Dict, theme: str) -> str:
        """Create practical applications for themes"""
        applications = {
            'duty_dharma': "Focus on your natural talents and current responsibilities. Your dharma unfolds through sincere effort in your present circumstances.",
            'detachment': "Perform your actions with full dedication, but release attachment to specific outcomes. This reduces anxiety and increases effectiveness.",
            'action_karma': "Act with good intentions, consider the impact on others, and perform your duties without ego-driven motivations.",
            'mind_control': "Practice regular meditation, observe your thoughts without judgment, and cultivate one-pointed focus through spiritual practice.",
            'fear_anxiety': "Remember that you are more than your circumstances. Fear often comes from attachment - practice surrender and trust in the divine order.",
            'purpose_meaning': "Your purpose emerges through self-knowledge. Study yourself, serve others, and follow your authentic nature rather than external expectations."
        }
        
        return applications.get(theme, "Apply this wisdom through regular reflection and gradual practice in daily life.")

    def _create_psychology_integration(self, verse: Dict, psych_category: str) -> Dict:
        """Create psychology integration examples"""
        psychology_integrations = {
            'cognitive': "This aligns with cognitive behavioral therapy principles - our thoughts shape our experience.",
            'emotional': "Modern emotion regulation research supports this ancient wisdom about managing emotional states.",
            'behavioral': "Behavioral psychology confirms that consistent practice creates lasting change, as taught in this verse.",
            'therapeutic': "This verse offers therapeutic value similar to mindfulness-based interventions in modern psychology.",
            'mindfulness': "This teaching parallels mindfulness meditation practices used in contemporary therapy."
        }
        
        if psych_category not in psychology_integrations:
            return None
            
        return {
            "prompt": f"How does ancient wisdom relate to modern psychology regarding {psych_category} aspects?",
            "completion": f"The Bhagavad Gita verse {verse['chapter']}.{verse['verse']} states: \"{verse['translation']}\" {psychology_integrations[psych_category]} Both traditions recognize the importance of {psych_category} awareness for human wellbeing.",
            "source": "psychology_integration",
            "themes": verse['themes'],
            "psychology_category": psych_category
        }

    def save_processed_data(self, verses: List[Dict], training_examples: List[Dict]):
        """Save processed data in multiple formats"""
        
        # Save raw verses data
        with open(self.output_dir / 'gita_verses.json', 'w', encoding='utf-8') as f:
            json.dump(verses, f, ensure_ascii=False, indent=2)
        
        # Save training examples for fine-tuning
        with open(self.output_dir / 'gita_training.jsonl', 'w', encoding='utf-8') as f:
            for example in training_examples:
                f.write(json.dumps(example, ensure_ascii=False) + '\n')
        
        # Save structured analysis
        analysis = {
            "total_verses": len(verses),
            "total_training_examples": len(training_examples),
            "themes_distribution": self._analyze_theme_distribution(verses),
            "complexity_distribution": self._analyze_complexity_distribution(verses),
            "psychology_connections": self._analyze_psychology_connections(verses)
        }
        
        with open(self.output_dir / 'gita_analysis.json', 'w', encoding='utf-8') as f:
            json.dump(analysis, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Processed {len(verses)} verses into {len(training_examples)} training examples")
        print(f"📁 Data saved to {self.output_dir}")
        
    def _analyze_theme_distribution(self, verses: List[Dict]) -> Dict:
        """Analyze distribution of themes"""
        theme_counts = {}
        for verse in verses:
            for theme in verse['themes']:
                theme_counts[theme] = theme_counts.get(theme, 0) + 1
        return theme_counts
    
    def _analyze_complexity_distribution(self, verses: List[Dict]) -> Dict:
        """Analyze complexity distribution"""
        complexity_counts = {}
        for verse in verses:
            complexity = verse['complexity']
            complexity_counts[complexity] = complexity_counts.get(complexity, 0) + 1
        return complexity_counts
    
    def _analyze_psychology_connections(self, verses: List[Dict]) -> Dict:
        """Analyze psychology connections"""
        psych_counts = {}
        for verse in verses:
            for connection in verse['psychological_applications']:
                psych_counts[connection] = psych_counts.get(connection, 0) + 1
        return psych_counts

def main():
    """Main processing function"""
    print("🕉️  Divine Wisdom - Gita Processor")
    print("=" * 50)
    
    # Configure paths - update these for your data
    input_file = "data/raw/bhagavad_gita.json"  # Your Gita data file
    output_dir = "data/processed/gita"
    
    processor = GitaProcessor(input_file, output_dir)
    
    # Process the verses
    print("📖 Processing Bhagavad Gita verses...")
    verses = processor.process_gita_text("structured")  # Change format as needed
    
    if not verses:
        print("❌ No verses processed. Check your input file format.")
        return
    
    # Create training dataset
    print("🧠 Creating training dataset...")
    training_examples = processor.create_training_dataset(verses)
    
    # Save everything
    print("💾 Saving processed data...")
    processor.save_processed_data(verses, training_examples)
    
    print("\n✨ Processing complete!")
    print(f"Ready for AI training with {len(training_examples)} examples")

if __name__ == "__main__":
    main()
