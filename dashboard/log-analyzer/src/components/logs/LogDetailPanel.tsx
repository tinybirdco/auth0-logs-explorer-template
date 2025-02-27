'use client';

import { LogEntry } from "@/lib/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LogDetailPanelProps {
  log: LogEntry | null;
  onClose: () => void;
  isOpen: boolean;
}

export function LogDetailPanel({ log, onClose, isOpen }: LogDetailPanelProps) {
  const [hasShownBefore, setHasShownBefore] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (isOpen && !hasShownBefore) {
      setIsAnimatingIn(true);
      setHasShownBefore(true);
      setTimeout(() => {
        setIsAnimatingIn(false);
      }, 300);
    }
  }, [isOpen, hasShownBefore]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setHasShownBefore(false);
      onClose();
    }, 300);
  };

  if (!log) return null;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const formatTime = (ms: number) => {
    return `${ms}ms`;
  };

  return (
    <div className={cn(
      "fixed top-0 right-0 h-screen w-[600px] bg-[--background-secondary] z-50",
      isAnimatingIn ? "animate-slide-in-from-right" : "",
      isClosing ? "animate-slide-out-to-right" : "",
      !isOpen && !isClosing ? "translate-x-full" : "translate-x-0",
      "transition-transform duration-300 ease-in-out"
    )}>
      <div className="pt-[30px] h-full flex flex-col">
        {/* Header */}
        <div className="pr-8 flex justify-end mb-6">
          <Button
            variant="ghost"
            className="group relative h-10 w-10 flex items-center justify-center hover:w-auto hover:py-3 hover:px-3.5 hover:bg-white hover:rounded-lg rounded-lg bg-white border border-[var(--border-gray)] hover:border-[var(--border-gray)]"
            onClick={handleClose}
          >
            <span className="text-sm text-[#357AF6] opacity-0 group-hover:opacity-100 whitespace-nowrap mr-6">
              Close
            </span>
            <X className="h-4 w-4 text-gray-500 group-hover:text-[#357AF6] absolute right-3" />
          </Button>
        </div>

        {/* Request Info */}
        <div className="px-8 mb-6 text-white">
          <div className="flex items-center gap-2 mb-[26px]">
            <span>{log.tenant_name}</span>
            <span>{log.user_name}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <span>Request started</span>
            </div>
            <span>{formatDate(log.timestamp)}</span>
          </div>
        </div>

        {/* Request Details Card */}
        <div className="mx-4 bg-white rounded-lg p-2">
          <div className="px-4 py-[16px] space-y-[24px]">
            {/* Request ID */}
            <div className="flex justify-between items-center border-b border-[--table-separator] pb-[16px]">
              <span className="text-sm text-[--text-secondary]">Log ID</span>
              <span className="text-sm text-[--text-secondary] truncate max-w-[400px]">{log.log_id}</span>
            </div>

            <div className="flex justify-between items-center border-b border-[--table-separator] pb-[16px]">
              <span className="text-sm text-[--text-secondary]">User Name</span>
              <span className="text-sm text-[--text-secondary] truncate max-w-[400px]">{log.user_name}</span>
            </div>
            <div className="flex justify-between items-center border-b border-[--table-separator] pb-[16px]">
              <span className="text-sm text-[--text-secondary]">User Agent</span>
              <span className="text-sm text-[--text-secondary] truncate max-w-[400px]">{log.user_agent}</span>
            </div>

            {/* User Agent */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[--text-secondary]">Host</span>
              <span className="text-sm text-[--text-secondary] truncate max-w-[400px]">{log.hostname}</span>
            </div>
          </div>
        </div>
        {/* Log Message Card */}
        <div className="mx-4 mt-6 bg-white rounded-lg">
          <div className="px-4 py-[16px]">
            <div className="text-sm text-[--text-secondary] whitespace-pre-wrap break-words">
              {log.description}
            </div>
          </div>
        </div>
        <div className="mx-4 mt-6 bg-white rounded-lg">
          <div className="px-4 py-[16px]">
            <div className="text-sm text-[--text-secondary] whitespace-pre-wrap break-words">
              {log.data}
            </div>
          </div>
        </div>
        <div className="mx-4 mt-6 bg-white rounded-lg p-2">
          <div className="px-4 py-[16px] space-y-[24px]">
            <div className="flex justify-between items-center border-b border-[--table-separator] pb-[16px]">
              <span className="text-sm text-[--text-secondary]">Connection</span>
              <span className="text-sm text-[--text-secondary] truncate max-w-[400px]">{log.connection}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[--text-secondary]">Strategy</span>
              <span className="text-sm text-[--text-secondary] truncate max-w-[400px]">{log.strategy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[--text-secondary]">Strategy Type</span>
              <span className="text-sm text-[--text-secondary] truncate max-w-[400px]">{log.strategy_type}</span>
            </div>
          </div>
        </div>

        <div className="px-8 mt-6 text-white">

        </div>
      </div>
    </div>
  );
} 