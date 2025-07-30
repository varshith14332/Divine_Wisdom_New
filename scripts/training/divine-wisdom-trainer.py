#!/usr/bin/env python3
"""
Divine Wisdom - AI Model Training Pipeline
Combines Gita and Psychology data for fine-tuning
"""

import json
import os
import random
from pathlib import Path
from typing import List, Dict, Any
import openai
from dataclasses import dataclass
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class TrainingConfig:
    """Configuration for training pipeline"""
    model_name: str = "gpt-3.5-turbo"
    max_training_examples: int = 3000
    validation_split: float = 0.1
    gita_weight: float = 0.6  # 60% Gita, 40% Psychology
    psychology_weight: float = 0.4
    output_model_name: str = "divine-wisdom-v1"
    
class DivineWisdomTrainer:
    def __init__(self, config: TrainingConfig):
        self.config = config
        self.openai_client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        # Set up paths
        self.data_dir = Path("data/processed")
        self.output_dir = Path("models/divine-wisdom")
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
    def prepare_training_data(self) -> Dict[str, List[Dict]]:
        """Combine and prepare training data from Gita and Psychology sources"""
        
        logger.info("📚 Loading processed data...")
        
        # Load Gita training data
        gita_file = self.data_dir / "gita" / "gita_training.jsonl"
        gita_examples = self._load_jsonl(gita_file)
        logger.info(f"Loaded {len(gita_examples)} Gita examples")
        
        # Load Psychology training data
        psych_file = self.data_dir / "psychology" / "psychology_training.jsonl"
        psych_examples = self._load_jsonl(psych_file)
        logger.info(f"Loaded {len(psych_examples)} Psychology examples")
        
        # Balance the datasets according to weights
        total_examples = min(self.config.max_training_examples, 
                           len(gita_examples) + len(psych_examples))
        
        gita_count = int(total_examples * self.config.gita_weight)
        psych_count = int(total_examples * self.config.psychology_weight)
        
        # Sample examples
        if len(gita_examples) > gita_count:
            gita_examples = random.sample(gita_examples, gita_count)
        if len(psych_examples) > psych_count:
            psych_examples = random.sample(psych_examples, psych_count)
        
        # Combine and create integration examples
        combined_examples = gita_examples + psych_examples
        integration_examples = self._create_integration_examples(gita_examples, psych_examples)
        
        # Add integration examples
        combined_examples.extend(integration_examples[:200])  # Add up to 200 integration examples
        
        # Shuffle
        random.shuffle(combined_examples)
        
        # Split into train/validation
        split_idx = int(len(combined_examples) * (1 - self.config.validation_split))
        
        return {
            'train': combined_examples[:split_idx],
            'validation': combined_examples[split_idx:],
            'stats': {
                'total_examples': len(combined_examples),
                'gita_examples': len(gita_examples),
                'psychology_examples': len(psych_examples),
                'integration_examples': len(integration_examples),
                'train_size': split_idx,
                'validation_size': len(combined_examples) - split_idx
            }
        }
    
    def _load_jsonl(self, file_path: Path) -> List[Dict]:
        """Load JSONL file"""
        examples = []
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.strip():
                        examples.append(json.loads(line))
        return examples
    
    def _create_integration_examples(self, gita_examples: List[Dict], 
                                   psych_examples: List[Dict]) -> List[Dict]:
        """Create examples that explicitly integrate both traditions"""
        
        integration_examples = []
        
        # Common life situations that both traditions address
        life_situations = [
            {
                'situation': 'dealing with anxiety and worry',
                'keywords': ['anxiety', 'worry', 'fear', 'stress']
            },
            {
                'situation': 'finding purpose and meaning in life',
                'keywords': ['purpose', 'meaning', 'dharma', 'direction']
            },
            {
                'situation': 'managing difficult emotions',
                'keywords': ['emotions', 'anger', 'sadness', 'emotional']
            },
            {
                'situation': 'improving relationships',
                'keywords': ['relationship', 'love', 'attachment', 'conflict']
            },
            {
                'situation': 'dealing with failure and setbacks',
                'keywords': ['failure', 'setback', 'resilience', 'coping']
            },
            {
                'situation': 'finding inner peace and calm',
                'keywords': ['peace', 'calm', 'meditation', 'mindfulness']
            }
        ]
        
        for situation in life_situations:
            # Find relevant Gita examples
            relevant_gita = [ex for ex in gita_examples 
                           if any(keyword in ex.get('completion', '').lower() 
                                 for keyword in situation['keywords'])][:2]
            
            # Find relevant Psychology examples  
            relevant_psych = [ex for ex in psych_examples
                            if any(keyword in ex.get('completion', '').lower() 
                                  for keyword in situation['keywords'])][:2]
            
            if relevant_gita and relevant_psych:
                integration_example = self._create_single_integration(
                    situation['situation'], relevant_gita[0], relevant_psych[0]
                )
                integration_examples.append(integration_example)
        
        return integration_examples
    
    def _create_single_integration(self, situation: str, gita_ex: Dict, psych_ex: Dict) -> Dict:
        """Create a single integration example"""
        
        return {
            "prompt": f"I'm struggling with {situation}. Can you help me understand this from both ancient wisdom and modern psychology?",
            "completion": f"Both ancient wisdom and modern psychology offer valuable insights for {situation}.\n\nFrom the Bhagavad Gita perspective: {gita_ex.get('completion', '')[:200]}...\n\nModern psychology adds: {psych_ex.get('completion', '')[:200]}...\n\nBoth traditions emphasize that understanding and practical application are key to transformation. The Gita's timeless wisdom aligns beautifully with evidence-based psychological approaches, offering you both spiritual depth and practical tools.",
            "source": "integration",
            "gita_source": gita_ex.get('source', ''),
            "psychology_source": psych_ex.get('source', ''),
            "situation": situation
        }
    
    def format_for_fine_tuning(self, examples: List[Dict]) -> List[Dict]:
        """Format examples for OpenAI fine-tuning"""
        
        formatted_examples = []
        
        for example in examples:
            # Create the training format
            formatted_example = {
                "messages": [
                    {
                        "role": "system",
                        "content": "You are Divine Wisdom AI, a compassionate guide that combines ancient wisdom from the Bhagavad Gita with modern psychology. Provide helpful, balanced guidance that honors both spiritual traditions and scientific understanding. Be practical, empathetic, and accessible."
                    },
                    {
                        "role": "user", 
                        "content": example.get('prompt', '')
                    },
                    {
                        "role": "assistant",
                        "content": example.get('completion', '')
                    }
                ]
            }
            
            formatted_examples.append(formatted_example)
        
        return formatted_examples
    
    def save_training_files(self, data: Dict[str, List[Dict]]) -> Dict[str, str]:
        """Save training files in OpenAI format"""
        
        file_paths = {}
        
        for split_name, examples in data.items():
            if split_name == 'stats':
                continue
                
            # Format for fine-tuning
            formatted_examples = self.format_for_fine_tuning(examples)
            
            # Save as JSONL
            file_path = self.output_dir / f"{split_name}_data.jsonl"
            with open(file_path, 'w', encoding='utf-8') as f:
                for example in formatted_examples:
                    f.write(json.dumps(example, ensure_ascii=False) + '\n')
            
            file_paths[split_name] = str(file_path)
            logger.info(f"💾 Saved {len(formatted_examples)} {split_name} examples to {file_path}")
        
        # Save stats
        stats_path = self.output_dir / "training_stats.json"
        with open(stats_path, 'w', encoding='utf-8') as f:
            json.dump({
                **data['stats'],
                'config': {
                    'model_name': self.config.model_name,
                    'gita_weight': self.config.gita_weight,
                    'psychology_weight': self.config.psychology_weight,
                    'max_training_examples': self.config.max_training_examples
                },
                'created_at': datetime.now().isoformat()
            }, f, indent=2)
        
        return file_paths
    
    def start_fine_tuning(self, training_file_path: str) -> str:
        """Start OpenAI fine-tuning job"""
        
        logger.info("🚀 Starting OpenAI fine-tuning...")
        
        try:
            # Upload training file
            logger.info("📤 Uploading training file...")
            with open(training_file_path, 'rb') as f:
                training_file = self.openai_client.files.create(
                    file=f,
                    purpose='fine-tune'
                )
            
            logger.info(f"✅ Training file uploaded: {training_file.id}")
            
            # Create fine-tuning job
            logger.info("🎯 Creating fine-tuning job...")
            fine_tune_job = self.openai_client.fine_tuning.jobs.create(
                training_file=training_file.id,
                model=self.config.model_name,
                suffix=self.config.output_model_name
            )
            
            logger.info(f"✅ Fine-tuning job created: {fine_tune_job.id}")
            logger.info(f"📊 Status: {fine_tune_job.status}")
            
            # Save job info
            job_info = {
                'job_id': fine_tune_job.id,
                'training_file_id': training_file.id,
                'model': self.config.model_name,
                'status': fine_tune_job.status,
                'created_at': datetime.now().isoformat()
            }
            
            job_file = self.output_dir / "fine_tune_job.json"
            with open(job_file, 'w') as f:
                json.dump(job_info, f, indent=2)
            
            return fine_tune_job.id
            
        except Exception as e:
            logger.error(f"❌ Fine-tuning failed: {e}")
            raise
    
    def check_fine_tune_status(self, job_id: str) -> Dict:
        """Check status of fine-tuning job"""
        
        try:
            job = self.openai_client.fine_tuning.jobs.retrieve(job_id)
            
            status_info = {
                'job_id': job.id,
                'status': job.status,
                'created_at': job.created_at,
                'finished_at': job.finished_at,
                'fine_tuned_model': job.fine_tuned_model,
                'training_file': job.training_file,
                'result_files': job.result_files
            }
            
            logger.info(f"📊 Job Status: {job.status}")
            if job.fine_tuned_model:
                logger.info(f"🎉 Model Ready: {job.fine_tuned_model}")
            
            return status_info
            
        except Exception as e:
            logger.error(f"❌ Status check failed: {e}")
            raise
    
    def test_model(self, model_id: str, test_prompts: List[str]) -> List[Dict]:
        """Test the fine-tuned model"""
        
        logger.info(f"🧪 Testing model: {model_id}")
        
        results = []
        
        for prompt in test_prompts:
            try:
                response = self.openai_client.chat.completions.create(
                    model=model_id,
                    messages=[
                        {
                            "role": "system",
                            "content": "You are Divine Wisdom AI, combining Bhagavad Gita wisdom with modern psychology."
                        },
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    max_tokens=300,
                    temperature=0.7
                )
                
                result = {
                    'prompt': prompt,
                    'response': response.choices[0].message.content,
                    'usage': response.usage.total_tokens
                }
                
                results.append(result)
                logger.info(f"✅ Test completed for: {prompt[:50]}...")
                
            except Exception as e:
                logger.error(f"❌ Test failed for prompt: {e}")
                results.append({
                    'prompt': prompt,
                    'response': f"Error: {e}",
                    'usage': 0
                })
        
        # Save test results
        test_file = self.output_dir / "test_results.json"
        with open(test_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
        
        return results

def main():
    """Main training pipeline"""
    print("🕉️  Divine Wisdom - AI Training Pipeline")
    print("=" * 50)
    
    # Check for OpenAI API key
    if not os.getenv('OPENAI_API_KEY'):
        print("❌ Please set OPENAI_API_KEY environment variable")
        return
    
    # Configuration
    config = TrainingConfig(
        model_name="gpt-3.5-turbo-0125",  # Latest model
        max_training_examples=2000,
        gita_weight=0.6,
        psychology_weight=0.4,
        output_model_name="divine-wisdom-v1"
    )
    
    trainer = DivineWisdomTrainer(config)
    
    # Step 1: Prepare training data
    print("\n📚 Step 1: Preparing training data...")
    training_data = trainer.prepare_training_data()
    
    print(f"✅ Prepared {training_data['stats']['total_examples']} total examples")
    print(f"   - Gita: {training_data['stats']['gita_examples']}")
    print(f"   - Psychology: {training_data['stats']['psychology_examples']}")
    print(f"   - Integration: {training_data['stats']['integration_examples']}")
    
    # Step 2: Save training files
    print("\n💾 Step 2: Saving training files...")
    file_paths = trainer.save_training_files(training_data)
    
    # Step 3: Start fine-tuning
    print("\n🚀 Step 3: Starting fine-tuning...")
    job_id = trainer.start_fine_tuning(file_paths['train'])
    
    print(f"\n✨ Fine-tuning job started!")
    print(f"Job ID: {job_id}")
    print(f"You can check status with: python -c \"from divine_wisdom_trainer import *; trainer = DivineWisdomTrainer(TrainingConfig()); print(trainer.check_fine_tune_status('{job_id}'))\"")
    
    # Test prompts for when model is ready
    test_prompts = [
        "I'm feeling anxious about my future. Can you help me find peace?",
        "How can I find my life purpose according to both ancient wisdom and modern psychology?",
        "I'm struggling with letting go of past mistakes. What guidance can you offer?",
        "How do I balance worldly responsibilities with spiritual growth?",
        "I'm having trouble with difficult relationships. What should I do?"
    ]
    
    print(f"\n📋 Test prompts ready for when training completes:")
    for i, prompt in enumerate(test_prompts, 1):
        print(f"   {i}. {prompt}")

if __name__ == "__main__":
    main()
