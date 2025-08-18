import React, { useState } from 'react';
import type { Content, Tag } from '../types';
import { X } from 'lucide-react';

export const ContentForm: React.FC<{
  content?: Content;
  tags: Tag[];
  onSave: (content: Omit<Content, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}> = ({ content, tags, onSave, onCancel }) => {
  const [title, setTitle] = useState(content?.title || '');
  const [description, setDescription] = useState(content?.description || '');
  const [contentText, setContentText] = useState(content?.content || '');
  const [type, setType] = useState<Content['type']>(content?.type || 'note');
  const [url, setUrl] = useState(content?.url || '');
  const [selectedTags, setSelectedTags] = useState<Tag[]>(content?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      content: contentText,
      type,
      url: url || undefined,
      tags: selectedTags,
      isFavorite: content?.isFavorite || false,
    });
  };

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id) ? prev.filter((t) => t.id !== tag.id) : [...prev, tag],
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{content ? 'Edit Content' : 'Add New Content'}</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as Content['type'])}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="note">Note</option>
            <option value="link">Link</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Enter a title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Brief description..."
            required
          />
        </div>

        {(type === 'link' || type === 'video') && (
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="https://..."
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 h-32"
            placeholder="Enter your content..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-colors ${
                  selectedTags.some((t) => t.id === tag.id)
                    ? 'border-purple-500 text-purple-700 bg-purple-50'
                    : 'border-gray-200 text-gray-600 hover:border-purple-300'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button onClick={handleSubmit} className="flex-1 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors">
            {content ? 'Update' : 'Save'}
          </button>
          <button onClick={onCancel} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
