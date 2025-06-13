import React from 'react';
import { FileText, Download, Eye, Trash2, Upload, File, FilePlus } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface CandidateDocumentsProps {
  candidateId: string;
}

const CandidateDocuments: React.FC<CandidateDocumentsProps> = ({ candidateId }) => {
  const { documents } = useData();
  const candidateDocuments = documents.filter(doc => doc.candidateId === candidateId);
  
  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="h-8 w-8 text-green-500" />;
      case 'pptx':
      case 'ppt':
        return <FileText className="h-8 w-8 text-orange-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <File className="h-8 w-8 text-purple-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Documents ({candidateDocuments.length})</h3>
        <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100 transition">
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {candidateDocuments.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <FilePlus className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-gray-800 font-medium mb-1">No documents yet</h3>
          <p className="text-gray-500 text-sm mb-4">Upload the candidate's resume, portfolio, or other documents</p>
          <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition">
            <Upload className="h-4 w-4" />
            Upload First Document
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {candidateDocuments.map((document) => (
            <div key={document.id} className="flex items-center justify-between p-4 bg-white rounded-md border border-gray-100 hover:border-gray-300 transition">
              <div className="flex items-center gap-3">
                {getDocumentIcon(document.fileType)}
                <div>
                  <h4 className="font-medium text-gray-800">{document.name}</h4>
                  <p className="text-xs text-gray-500">
                    {document.fileType.toUpperCase()} • {document.fileSize} • 
                    Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateDocuments;