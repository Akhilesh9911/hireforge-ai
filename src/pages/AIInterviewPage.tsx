import React, { useState, useEffect } from 'react';
import {
  Bot,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileCode,
  BookOpen,
  Layers,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Loader } from '../components/ui/Loader';
import { InterviewQuestion } from '../types';
import { interviewService } from '../services/interviewService';

export const AIInterviewPage: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [role, setRole] = useState('Software Engineer');
  const [difficulty, setDifficulty] = useState('Mid-Level');
  const [category, setCategory] = useState('Technical');
  const [isGenerating, setIsGenerating] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedStarId, setExpandedStarId] = useState<string | null>('q_1');
  const [userNotes, setUserNotes] = useState<{ [key: string]: string }>({});
  const [savedNotesStatus, setSavedNotesStatus] = useState<string | null>(null);

  const loadQuestions = async () => {
    const list = await interviewService.getQuestions(role, category);
    setQuestions(list);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await interviewService.generateQuestions(role, difficulty, category);
      setQuestions(generated);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (q: InterviewQuestion) => {
    const text = `Question: ${q.question}\n\nKey Points:\n${q.keyPoints.map((k) => `- ${k}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleStar = (id: string) => {
    setExpandedStarId(expandedStarId === id ? null : id);
  };

  const handleNoteChange = (id: string, text: string) => {
    setUserNotes((prev) => ({ ...prev, [id]: text }));
  };

  const handleSaveNote = async (id: string) => {
    await interviewService.saveNote(id, userNotes[id] || '');
    setSavedNotesStatus(id);
    setTimeout(() => setSavedNotesStatus(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Bot className="w-5 h-5 text-zinc-700 dark:text-zinc-300" /> AI Technical Interview Generator
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Generate targeted interview questions with STAR behavioral answers and key response points.
        </p>
      </div>

      {/* Generator Control Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Question Generation Config</CardTitle>
          <CardDescription className="text-xs">
            Select target criteria to generate customized interview questions
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Target Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs py-2 px-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="Full Stack Engineer">Full Stack Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs py-2 px-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="Technical">Technical</option>
                <option value="System Design">System Design</option>
                <option value="Behavioral">Behavioral (STAR Method)</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Seniority Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs py-2 px-3 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="Junior">Junior (1-2 yrs)</option>
                <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
                <option value="Senior">Senior Lead (6+ yrs)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              size="sm"
              onClick={handleGenerate}
              isLoading={isGenerating}
              icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
            >
              Generate Questions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Questions Output List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Interview Questions ({questions.length})
          </h3>
          <Badge variant="neutral" size="sm">
            {role} • {difficulty}
          </Badge>
        </div>

        {isGenerating ? (
          <Card className="p-8">
            <Loader label="Generating interview questions..." />
          </Card>
        ) : questions.length === 0 ? (
          <Card className="p-8 text-center text-xs text-zinc-500">
            No questions found for this topic. Click "Generate Questions" above to produce a new set.
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <Card key={q.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="info" size="sm">
                          {q.category}
                        </Badge>
                        <Badge variant="neutral" size="sm">
                          {q.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm font-bold leading-snug pt-1">
                        {q.question}
                      </CardTitle>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(q)}
                      icon={copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    >
                      {copiedId === q.id ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  {/* Key points answer bullets */}
                  <div className="space-y-1.5 bg-zinc-50 dark:bg-zinc-900/60 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
                      Key Answer Points
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
                      {q.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-400 mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* STAR Method Toggle */}
                  {q.starFramework && (
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleStar(q.id)}
                        className="w-full p-2.5 bg-zinc-100/70 dark:bg-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" /> STAR Method Behavioral Example
                        </span>
                        {expandedStarId === q.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {expandedStarId === q.id && (
                        <div className="p-3 text-xs space-y-2 bg-white dark:bg-zinc-900 font-sans border-t border-zinc-200 dark:border-zinc-800">
                          <div>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">Situation: </span>
                            <span className="text-zinc-600 dark:text-zinc-400">{q.starFramework.situation}</span>
                          </div>
                          <div>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">Task: </span>
                            <span className="text-zinc-600 dark:text-zinc-400">{q.starFramework.task}</span>
                          </div>
                          <div>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">Action: </span>
                            <span className="text-zinc-600 dark:text-zinc-400">{q.starFramework.action}</span>
                          </div>
                          <div>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">Result: </span>
                            <span className="text-zinc-600 dark:text-zinc-400">{q.starFramework.result}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Personal Notes Box */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                        Personal Study Notes
                      </label>
                      {savedNotesStatus === q.id && (
                        <span className="text-[10px] text-emerald-600 font-mono">Saved!</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        value={userNotes[q.id] ?? q.userNotes ?? ''}
                        onChange={(e) => handleNoteChange(q.id, e.target.value)}
                        placeholder="Type personal solution notes or interview key thoughts..."
                        className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveNote(q.id)}
                        className="self-end"
                        icon={<Save className="w-3.5 h-3.5" />}
                      >
                        Save Note
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
