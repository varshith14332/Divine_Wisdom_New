#!/usr/bin/env python3
"""
Divine Wisdom - Psychology Papers Processor
Processes psychology research papers into training format
"""

import json
import re
import pandas as pd
from typing import List, Dict, Any, Optional
from pathlib import Path
import PyPDF2
import docx
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

class PsychologyProcessor:
    def __init__(self, input_dir: str, output_dir: str):
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Psychology domains and their connection to spiritual concepts
        self.psychology_domains = {
            'cognitive_behavioral': {
                'keywords': ['cognitive', 'behavioral', 'CBT', 'thought patterns', 'beliefs'],
                'gita_connections': ['mind control', 'mental discipline', 'right thinking'],
                'applications': ['changing thought patterns', 'behavioral modification', 'mental training']
            },
            'mindfulness_meditation': {
                'keywords': ['mindfulness', 'meditation', 'awareness', 'present moment'],
                'gita_connections': ['dhyana', 'meditation', 'witness consciousness'],
                'applications': ['stress reduction', 'emotional regulation', 'mental clarity']
            },
            'positive_psychology': {
                'keywords': ['wellbeing', 'flourishing', 'strengths', 'happiness', 'meaning'],
                'gita_connections': ['dharma', 'purpose', 'self-realization'],
                'applications': ['finding purpose', 'character development', 'life satisfaction']
            },
            'attachment_theory': {
                'keywords': ['attachment', 'relationships', 'bonding', 'security'],
                'gita_connections': ['detachment', 'love without attachment', 'devotion'],
                'applications': ['healthy relationships', 'emotional security', 'love and letting go']
            },
            'trauma_therapy': {
                'keywords': ['trauma', 'PTSD', 'healing', 'recovery', 'resilience'],
                'gita_connections': ['overcoming suffering', 'inner strength', 'spiritual healing'],
                'applications': ['trauma recovery', 'building resilience', 'post-traumatic growth']
            },
            'flow_psychology': {
                'keywords': ['flow', 'peak performance', 'engagement', 'intrinsic motivation'],
                'gita_connections': ['karma yoga', 'selfless action', 'losing the ego'],
                'applications': ['optimal performance', 'intrinsic motivation', 'work as worship']
            },
            'emotion_regulation': {
                'keywords': ['emotions', 'regulation', 'emotional intelligence', 'affect'],
                'gita_connections': ['equanimity', 'emotional balance', 'inner peace'],
                'applications': ['managing emotions', 'emotional stability', 'inner harmony']
            },
            'existential_psychology': {
                'keywords': ['meaning', 'purpose', 'death anxiety', 'existential', 'authenticity'],
                'gita_connections': ['life purpose', 'death and rebirth', 'authentic self'],
                'applications': ['finding meaning', 'confronting mortality', 'authentic living']
            }
        }

    def process_papers(self, file_formats: List[str] = ['pdf', 'docx', 'txt']) -> List[Dict]:
        """Process all psychology papers in the input directory"""
        all_papers = []
        
        for file_format in file_formats:
            pattern = f"*.{file_format}"
            files = list(self.input_dir.glob(pattern))
            
            print(f"📄 Found {len(files)} {file_format.upper()} files")
            
            for file_path in files:
                print(f"Processing: {file_path.name}")
                paper_data = self.process_single_paper(file_path)
                if paper_data:
                    all_papers.append(paper_data)
        
        return all_papers

    def process_single_paper(self, file_path: Path) -> Optional[Dict]:
        """Process a single psychology paper"""
        try:
            # Extract text based on file type
            if file_path.suffix.lower() == '.pdf':
                text = self._extract_pdf_text(file_path)
            elif file_path.suffix.lower() == '.docx':
                text = self._extract_docx_text(file_path)
            elif file_path.suffix.lower() == '.txt':
                text = self._extract_txt_text(file_path)
            else:
                print(f"Unsupported file format: {file_path.suffix}")
                return None
            
            if not text or len(text.strip()) < 100:
                print(f"❌ Could not extract sufficient text from {file_path.name}")
                return None
            
            # Analyze the paper
            analysis = self._analyze_paper(text, file_path.name)
            
            # Structure the paper data
            paper_data = {
                'filename': file_path.name,
                'title': analysis['title'],
                'abstract': analysis['abstract'],
                'key_concepts': analysis['key_concepts'],
                'main_findings': analysis['main_findings'],
                'practical_applications': analysis['practical_applications'],
                'psychology_domain': analysis['psychology_domain'],
                'gita_connections': analysis['gita_connections'],
                'methodology': analysis['methodology'],
                'evidence_level': analysis['evidence_level'],
                'full_text': text[:5000],  # First 5000 chars for reference
                'word_count': len(text.split()),
                'complexity': analysis['complexity']
            }
            
            return paper_data
            
        except Exception as e:
            print(f"❌ Error processing {file_path.name}: {e}")
            return None

    def _extract_pdf_text(self, file_path: Path) -> str:
        """Extract text from PDF file"""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                return text
        except Exception as e:
            print(f"Error reading PDF {file_path.name}: {e}")
            return ""

    def _extract_docx_text(self, file_path: Path) -> str:
        """Extract text from DOCX file"""
        try:
            doc = docx.Document(file_path)
            text = ""
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
            return text
        except Exception as e:
            print(f"Error reading DOCX {file_path.name}: {e}")
            return ""

    def _extract_txt_text(self, file_path: Path) -> str:
        """Extract text from TXT file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return file.read()
        except Exception as e:
            print(f"Error reading TXT {file_path.name}: {e}")
            return ""

    def _analyze_paper(self, text: str, filename: str) -> Dict:
        """Analyze psychology paper content"""
        sentences = sent_tokenize(text)
        
        analysis = {
            'title': self._extract_title(text, filename),
            'abstract': self._extract_abstract(text),
            'key_concepts': self._extract_key_concepts(text),
            'main_findings': self._extract_main_findings(sentences),
            'practical_applications': self._extract_practical_applications(text),
            'psychology_domain': self._identify_psychology_domain(text),
            'gita_connections': [],
            'methodology': self._identify_methodology(text),
            'evidence_level': self._assess_evidence_level(text),
            'complexity': self._assess_complexity(text)
        }
        
        # Connect to Gita teachings
        analysis['gita_connections'] = self._find_gita_connections(
            analysis['psychology_domain'], 
            analysis['key_concepts']
        )
        
        return analysis

    def _extract_title(self, text: str, filename: str) -> str:
        """Extract paper title"""
        lines = text.split('\n')[:10]  # Check first 10 lines
        
        for line in lines:
            line = line.strip()
            if len(line) > 20 and len(line) < 200 and not line.startswith('http'):
                # Likely the title
                return line
        
        # Fallback to filename
        return filename.replace('.pdf', '').replace('.docx', '').replace('_', ' ').title()

    def _extract_abstract(self, text: str) -> str:
        """Extract abstract from paper"""
        abstract_patterns = [
            r'abstract[:\s]+(.*?)(?=\n\s*\n|\nintroduction|\nkeywords)',
            r'summary[:\s]+(.*?)(?=\n\s*\n|\nintroduction)',
        ]
        
        text_lower = text.lower()
        
        for pattern in abstract_patterns:
            match = re.search(pattern, text_lower, re.DOTALL | re.IGNORECASE)
            if match:
                abstract = match.group(1).strip()
                if len(abstract) > 50:
                    return abstract[:500]  # Limit length
        
        # Fallback: first few sentences
        sentences = sent_tokenize(text)
        return ' '.join(sentences[:3])

    def _extract_key_concepts(self, text: str) -> List[str]:
        """Extract key psychological concepts"""
        # Use TF-IDF to find important terms
        stop_words = set(stopwords.words('english'))
        
        # Add psychology-specific stop words
        psych_stop_words = {'study', 'research', 'participants', 'method', 'results', 'analysis', 'data'}
        stop_words.update(psych_stop_words)
        
        words = word_tokenize(text.lower())
        words = [word for word in words if word.isalpha() and len(word) > 3 and word not in stop_words]
        
        # Find frequent meaningful terms
        word_freq = {}
        for word in words:
            word_freq[word] = word_freq.get(word, 0) + 1
        
        # Get top concepts
        key_concepts = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:15]
        return [concept[0] for concept in key_concepts]

    def _extract_main_findings(self, sentences: List[str]) -> List[str]:
        """Extract main findings from the paper"""
        finding_indicators = [
            'found that', 'results show', 'demonstrated that', 'revealed that',
            'indicates that', 'suggests that', 'concluded that', 'evidence shows'
        ]
        
        findings = []
        for sentence in sentences:
            sentence_lower = sentence.lower()
            if any(indicator in sentence_lower for indicator in finding_indicators):
                findings.append(sentence.strip())
                if len(findings) >= 5:  # Limit to top 5 findings
                    break
        
        return findings

    def _extract_practical_applications(self, text: str) -> List[str]:
        """Extract practical applications mentioned in the paper"""
        application_patterns = [
            r'practical implications?[:\s]+(.*?)(?=\n\s*\n)',
            r'clinical applications?[:\s]+(.*?)(?=\n\s*\n)',
            r'therapeutic[:\s]+(.*?)(?=\n\s*\n)',
        ]
        
        applications = []
        text_lower = text.lower()
        
        for pattern in application_patterns:
            matches = re.findall(pattern, text_lower, re.DOTALL)
            applications.extend(matches)
        
        # Clean and limit
        cleaned_applications = []
        for app in applications:
            cleaned = app.strip()[:200]  # Limit length
            if len(cleaned) > 20:
                cleaned_applications.append(cleaned)
        
        return cleaned_applications[:5]  # Top 5

    def _identify_psychology_domain(self, text: str) -> str:
        """Identify the main psychology domain of the paper"""
        text_lower = text.lower()
        domain_scores = {}
        
        for domain, info in self.psychology_domains.items():
            score = 0
            for keyword in info['keywords']:
                score += text_lower.count(keyword.lower())
            domain_scores[domain] = score
        
        # Return domain with highest score
        if domain_scores:
            return max(domain_scores, key=domain_scores.get)
        else:
            return 'general_psychology'

    def _find_gita_connections(self, psychology_domain: str, key_concepts: List[str]) -> List[str]:
        """Find connections to Gita teachings"""
        connections = []
        
        # Direct domain connections
        if psychology_domain in self.psychology_domains:
            connections.extend(self.psychology_domains[psychology_domain]['gita_connections'])
        
        # Concept-based connections
        concept_to_gita = {
            'mindfulness': 'present moment awareness',
            'meditation': 'dhyana yoga',
            'consciousness': 'witness consciousness',
            'detachment': 'vairagya',
            'purpose': 'dharma',
            'action': 'karma yoga',
            'devotion': 'bhakti yoga',
            'knowledge': 'jnana yoga',
            'suffering': 'overcoming dukha',
            'peace': 'inner peace and equanimity'
        }
        
        for concept in key_concepts:
            if concept in concept_to_gita:
                connections.append(concept_to_gita[concept])
        
        return list(set(connections))  # Remove duplicates

    def _identify_methodology(self, text: str) -> str:
        """Identify research methodology"""
        text_lower = text.lower()
        
        methodologies = {
            'randomized_controlled_trial': ['randomized', 'controlled trial', 'rct'],
            'meta_analysis': ['meta-analysis', 'systematic review'],
            'longitudinal': ['longitudinal', 'follow-up'],
            'cross_sectional': ['cross-sectional', 'survey'],
            'qualitative': ['qualitative', 'interview', 'phenomenological'],
            'experimental': ['experiment', 'manipulation', 'intervention'],
            'observational': ['observational', 'correlational']
        }
        
        for method, keywords in methodologies.items():
            if any(keyword in text_lower for keyword in keywords):
                return method
        
        return 'unspecified'

    def _assess_evidence_level(self, text: str) -> str:
        """Assess the level of evidence"""
        text_lower = text.lower()
        
        high_evidence = ['meta-analysis', 'systematic review', 'randomized controlled']
        medium_evidence = ['controlled trial', 'longitudinal', 'experimental']
        low_evidence = ['case study', 'survey', 'correlational']
        
        if any(term in text_lower for term in high_evidence):
            return 'high'
        elif any(term in text_lower for term in medium_evidence):
            return 'medium'
        elif any(term in text_lower for term in low_evidence):
            return 'low'
        else:
            return 'unspecified'

    def _assess_complexity(self, text: str) -> str:
        """Assess conceptual complexity"""
        word_count = len(text.split())
        technical_terms = [
            'neuroplasticity', 'neurotransmitter', 'prefrontal cortex', 'amygdala',
            'statistical significance', 'effect size', 'confidence interval'
        ]
        
        complexity_score = sum(1 for term in technical_terms if term in text.lower())
        
        if word_count > 5000 or complexity_score > 3:
            return 'high'
        elif word_count > 2000 or complexity_score > 1:
            return 'medium'
        else:
            return 'basic'

    def create_training_dataset(self, papers: List[Dict]) -> List[Dict]:
        """Create training examples from psychology papers"""
        training_examples = []
        
        for paper in papers:
            # Create various types of training examples
            
            # 1. Direct psychology explanation
            training_examples.append({
                "prompt": f"Explain the psychological concept from this research: {paper['title']}",
                "completion": f"Research on {paper['title']} shows: {paper['abstract'][:300]}... Key findings include: {' '.join(paper['main_findings'][:2])}",
                "source": "psychology",
                "domain": paper['psychology_domain'],
                "evidence_level": paper['evidence_level']
            })
            
            # 2. Integration with spiritual wisdom
            if paper['gita_connections']:
                integration_example = self._create_integration_example(paper)
                if integration_example:
                    training_examples.append(integration_example)
            
            # 3. Practical application questions
            for application in paper['practical_applications'][:2]:
                practical_example = self._create_practical_example(paper, application)
                if practical_example:
                    training_examples.append(practical_example)
            
            # 4. Concept explanation examples
            for concept in paper['key_concepts'][:3]:
                concept_example = self._create_concept_example(paper, concept)
                if concept_example:
                    training_examples.append(concept_example)
        
        return training_examples

    def _create_integration_example(self, paper: Dict) -> Optional[Dict]:
        """Create Gita-psychology integration example"""
        if not paper['gita_connections']:
            return None
        
        gita_connection = paper['gita_connections'][0]
        
        return {
            "prompt": f"How does modern psychology research support ancient wisdom about {gita_connection}?",
            "completion": f"Modern research in {paper['psychology_domain']} confirms ancient wisdom about {gita_connection}. Studies like '{paper['title']}' demonstrate that {paper['abstract'][:200]}... This aligns with teachings from the Bhagavad Gita about {gita_connection}, showing how both traditions recognize similar truths about human psychology and wellbeing.",
            "source": "integration",
            "psychology_domain": paper['psychology_domain'],
            "gita_connection": gita_connection,
            "evidence_level": paper['evidence_level']
        }

    def _create_practical_example(self, paper: Dict, application: str) -> Optional[Dict]:
        """Create practical application example"""
        if not application or len(application) < 20:
            return None
        
        return {
            "prompt": f"How can I apply psychological research about {paper['psychology_domain']} in my daily life?",
            "completion": f"Based on research in {paper['psychology_domain']}, practical applications include: {application} This approach is supported by studies showing {paper['main_findings'][0] if paper['main_findings'] else 'positive outcomes'}. You can start by implementing these evidence-based strategies gradually in your routine.",
            "source": "psychology_application",
            "domain": paper['psychology_domain'],
            "evidence_level": paper['evidence_level']
        }

    def _create_concept_example(self, paper: Dict, concept: str) -> Optional[Dict]:
        """Create concept explanation example"""
        if len(concept) < 4:
            return None
        
        return {
            "prompt": f"What does {concept} mean in psychology?",
            "completion": f"In psychology, {concept} is an important concept studied in {paper['psychology_domain']}. Research such as '{paper['title']}' explores how {concept} affects human behavior and wellbeing. {paper['abstract'][:150]}...",
            "source": "psychology_concept",
            "domain": paper['psychology_domain'],
            "concept": concept
        }

    def save_processed_data(self, papers: List[Dict], training_examples: List[Dict]):
        """Save processed psychology data"""
        
        # Save raw papers data
        with open(self.output_dir / 'psychology_papers.json', 'w', encoding='utf-8') as f:
            json.dump(papers, f, ensure_ascii=False, indent=2)
        
        # Save training examples
        with open(self.output_dir / 'psychology_training.jsonl', 'w', encoding='utf-8') as f:
            for example in training_examples:
                f.write(json.dumps(example, ensure_ascii=False) + '\n')
        
        # Save analysis
        analysis = {
            "total_papers": len(papers),
            "total_training_examples": len(training_examples),
            "domain_distribution": self._analyze_domain_distribution(papers),
            "evidence_distribution": self._analyze_evidence_distribution(papers),
            "complexity_distribution": self._analyze_complexity_distribution(papers)
        }
        
        with open(self.output_dir / 'psychology_analysis.json', 'w', encoding='utf-8') as f:
            json.dump(analysis, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Processed {len(papers)} papers into {len(training_examples)} training examples")
        print(f"📁 Data saved to {self.output_dir}")

    def _analyze_domain_distribution(self, papers: List[Dict]) -> Dict:
        """Analyze distribution of psychology domains"""
        domain_counts = {}
        for paper in papers:
            domain = paper['psychology_domain']
            domain_counts[domain] = domain_counts.get(domain, 0) + 1
        return domain_counts

    def _analyze_evidence_distribution(self, papers: List[Dict]) -> Dict:
        """Analyze evidence level distribution"""
        evidence_counts = {}
        for paper in papers:
            evidence = paper['evidence_level']
            evidence_counts[evidence] = evidence_counts.get(evidence, 0) + 1
        return evidence_counts

    def _analyze_complexity_distribution(self, papers: List[Dict]) -> Dict:
        """Analyze complexity distribution"""
        complexity_counts = {}
        for paper in papers:
            complexity = paper['complexity']
            complexity_counts[complexity] = complexity_counts.get(complexity, 0) + 1
        return complexity_counts

def main():
    """Main processing function"""
    print("🧠 Divine Wisdom - Psychology Processor")
    print("=" * 50)
    
    # Configure paths
    input_dir = "data/raw/psychology_papers"  # Your psychology papers directory
    output_dir = "data/processed/psychology"
    
    processor = PsychologyProcessor(input_dir, output_dir)
    
    # Process the papers
    print("📚 Processing psychology papers...")
    papers = processor.process_papers()
    
    if not papers:
        print("❌ No papers processed. Check your input directory and file formats.")
        return
    
    # Create training dataset
    print("🧠 Creating training dataset...")
    training_examples = processor.create_training_dataset(papers)
    
    # Save everything
    print("💾 Saving processed data...")
    processor.save_processed_data(papers, training_examples)
    
    print("\n✨ Processing complete!")
    print(f"Ready for AI training with {len(training_examples)} psychology examples")

if __name__ == "__main__":
    main()
