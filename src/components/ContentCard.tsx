import  {  useState } from 'react';
import { ExternalLink, Edit3, Trash2, Clock, AlertCircle } from 'lucide-react';
import EditForm from './EditForm';
import { Link, } from 'react-router-dom';

type Props = {
  title: string;
  id: string;
  link: string;
  description: string;
  createdAt: string;
  category:string
  onDelete: (id: string) => Promise<void>;
  onEdit?: () => void;
  refresh:()=>void
};

export default function ContentCard({ 
  id, 
  title, 
  description, 
  link, 
  createdAt, 
  category,
  onDelete, 
  onEdit ,refresh
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showEditForm,setEditForm] = useState(false)
  

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);
    
    try {
      await onDelete(id);
    } catch (error) {
      setDeleteError('Failed to delete. Please try again.');
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getDomainFromUrl = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'External Link';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 w-80 hover:border-blue-300 hover:shadow-md transition-all duration-200 group">
  {/* Title */}
  <Link to={`/brain/${id}`}>
    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
      {title?.trim() || 'Untitled Content'}
    </h3>

    {/* Description */}
    {description?.trim() && (
      <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-relaxed">
        {description}
      </p>
    )}
  </Link>

  {/* Category */}
  {category?.trim() && (
    <span className="inline-block text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 mr-7 py-0.5 mb-3">
      {category}
    </span>
  )}

  {/* Link */}
  {link?.trim() && (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-blue-600 text-sm mb-3 hover:text-blue-700 transition-colors group/link"
      aria-label={`Open ${getDomainFromUrl(link)} in new tab`}
    >
      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:scale-110" />
      <span className="truncate max-w-52 hover:underline">
        {getDomainFromUrl(link)}
      </span>
    </a>
  )}

  {/* Error Message */}
  {deleteError && (
    <div className="flex items-center gap-1.5 text-red-600 text-sm mb-3 p-2 bg-red-50 rounded-md">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span className="text-xs">{deleteError}</span>
    </div>
  )}

  {/* Footer */}
  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
    {/* Date */}
    <div className="flex items-center gap-1.5 text-xs text-gray-500">
      <Clock className="w-3 h-3" />
      <span>{formatDate(createdAt)}</span>
    </div>

    {/* Action Buttons - Show on hover */}
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={() => {
          setEditForm(true);
        }}
        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 cursor-pointer"
        aria-label="Edit content"
        disabled={isDeleting}
      >
        <Edit3 className="w-4 h-4" />
      </button>

      {showEditForm && (
        <EditForm
          refresh={refresh}
          id={id}
          title={title}
          link={link}
          description={description}
            
          onAdd={() => {}}
          onCancel={() => {
            setEditForm(false);
          }}
        />
      )}

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Delete content"
      >
        {isDeleting ? (
          <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4 " />
        )}
      </button>
    </div>
  </div>
</div>

  );
}